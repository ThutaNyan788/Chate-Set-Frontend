import {  InfiniteData, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "@/utils/axios";
import { CommentCollection, CommentData, CommentPayload } from "@/models/Models";
import { format } from 'date-fns';
import { useGlobalContext } from "@/context/AppContextProvider";

const storeComment = (field: string, id: number, payload: CommentPayload) => {
    return axios.post(`/comments/${field}/${id}/store`, payload, {
        headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
}

export const useStoreComment = (
  field: string, // Polymorphic type
  id: number // Polymorphic ID
) => {
  const { user } = useGlobalContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CommentPayload) => storeComment(field, id, payload),

    // Handle optimistic updates
    onMutate: async (newComment) => {
      const cacheKey = [field, id, "comments"];

      // Cancel ongoing queries
      await queryClient.cancelQueries({ queryKey: cacheKey });

      // Backup previous comments
      const previousComments = queryClient.getQueryData<InfiniteData<CommentCollection>>(cacheKey);

      // Create the optimistic comment
      const optimisticComment: CommentData = {
        type: "comment",
        id: Date.now(), // Temporary ID
        attributes: {
          id: Date.now(),
          body: newComment.data.attributes.body,
          user: {
            id: user.id, 
            name: user.name, 
            profile_photo_path: user.profile_photo_path,
          },
          replies: [],
          created_at: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
          updated_at: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        },
        relationships: {
          likes: {
            data: {
              type: "likes",
              attributes: {
                count: 0,
                liked: false,
              },
            },
          },
        },
      };

      // Optimistically update comments
      queryClient.setQueryData(cacheKey, (old: InfiniteData<CommentCollection> | undefined) => {
        if (!old) return old;

          return {
            ...old,
            pages: old.pages.map((page, index) =>
              index === 0 // Add only to the first page
                ? {
                    ...page,
                    data: [optimisticComment, ...page.data],
                    meta: {
                      ...page.meta,
                      total_comments: (page.meta.total_comments || 0) + 1,
                    },
                  }
                : page
            ),
          };
        });

      return { previousComments };
    },

    // Rollback on Error
      onError: (error, newComment, context) => {
      if (context?.previousComments) {
        queryClient.setQueryData([field, id, "comments"], context.previousComments);
      }
    },

    // Invalidate on Success
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [field, id, "comments"],
      });
    },
  });
};
