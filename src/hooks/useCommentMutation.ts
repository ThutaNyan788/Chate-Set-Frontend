import {  useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "@/utils/axios";
import { CommentData, CommentPayload } from "@/models/Models";
import { format } from 'date-fns';

const storeComment = (field:string,id:number,payload:CommentPayload) => {
    return axios.post(`/users/comments/${field}/${id}/store`, payload, {
        headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
}

export const useCommentMutation = (
  field: string, // Polymorphic type
  id: number // Polymorphic ID
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CommentPayload) => storeComment(field, id, payload),

    // Handle optimistic updates
    onMutate: async (newComment) => {
      const cacheKey = [field, id, "comments"];

      // Cancel ongoing queries
      await queryClient.cancelQueries({ queryKey: cacheKey });

      // Backup previous comments
      const previousComments = queryClient.getQueryData<CommentData[]>(cacheKey);

      // Optimistically update comments
      queryClient.setQueryData(cacheKey, (old: CommentData[] = []) => [
        ...old,
        {
          type: "comment",
          id: Date.now(), // Temporary ID
          attributes: {
            id: Date.now(),
            body: newComment.data.attributes.body,
            user: {
              id: 1, // Replace with authenticated user ID
              name: "Your Name", // Replace with authenticated user name
              profile_photo_path: null,
            },
            likes_count: 0,
            is_liked: false,
            replies: [],
            created_at: format(new Date(), "MMM dd, yyyy"),
            updated_at: format(new Date(), "MMM dd, yyyy"),
          },
        },
      ]);

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
