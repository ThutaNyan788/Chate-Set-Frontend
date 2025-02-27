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

export const useStoreReply = (
  field: string, // Polymorphic type
  id: number // Polymorphic ID
) => {
  
  const { user } = useGlobalContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CommentPayload) => storeComment(field, id, payload),

    // Handle optimistic updates
    onMutate: async (payload: CommentPayload) => {
        const cacheKey = [field, id, "comments"];

        // Cancel ongoing queries to prevent conflicting updates
        await queryClient.cancelQueries({ queryKey: cacheKey });

        // Backup previous comments
        const previousComments = queryClient.getQueryData<InfiniteData<CommentCollection>>(cacheKey);
        // Create the optimistic comment
        const optimisticComment: CommentData = {
            type: "comment",
            id: Date.now(), // Temporary ID
            attributes: {
              id: Date.now(),
              body: payload.data.attributes.body,
              parent_id: payload.data.attributes.parent_id,
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
      

        // Function to recursively update replies
      const addReplyRecursively = (comment: CommentData, newComment: CommentData): CommentData => {
          if (comment.id === newComment.attributes.parent_id) {
              // Add the reply under the correct comment (the parent)
              return {
                  ...comment,
                  attributes: {
                  ...comment.attributes,
                  replies: [...comment.attributes.replies, newComment],
                  },
              };
            }

            // If no match, traverse replies recursively
            if (comment.attributes.replies.length > 0) {
              return {
                  ...comment,
                  attributes: {
                  ...comment.attributes,
                  replies: comment.attributes.replies.map((reply) => addReplyRecursively(reply, newComment)),
                  },
              };
            }

            return comment;
        };

        // Optimistically update comments (including replies)
        queryClient.setQueryData(cacheKey, (old: InfiniteData<CommentCollection> | undefined) => {
            if (!old) return old;

            return {
            ...old,
            pages: old.pages.map((page, index) =>
                index === 0 // Add only to the first page
                ? {
                    ...page,
                    data: page.data.map((comment) => addReplyRecursively(comment, optimisticComment)),
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
