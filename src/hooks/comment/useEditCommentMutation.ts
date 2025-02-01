import { CommentCollection, CommentData, CommentPayload } from "@/models/Models";
import axios from "@/utils/axios";
import { InfiniteData, useMutation, useQueryClient } from "@tanstack/react-query";

export const useEditCommentMutation = (field: string, id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ commentId, payload }: { commentId: number; payload: CommentPayload }) =>
      axios.patch(`/comments/${commentId}/update`, payload, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }),

    onMutate: async ({ commentId, payload }) => {
        const cacheKey = [field, id, "comments"];

        // Cancel any ongoing queries
        await queryClient.cancelQueries({ queryKey: cacheKey });

        // Get the previous state of comments
        const previousComments = queryClient.getQueryData<InfiniteData<CommentCollection>>(cacheKey);

        // Optimistically update the comment and its replies (if any)
        queryClient.setQueryData(cacheKey, (old: InfiniteData<CommentCollection> | undefined) => {
            if (!old) return old;

            // Recursive function to update the comment or reply
            const updateComment = (comment: CommentData, commentId: number, body: string): any => {
            if (comment.id === commentId) {
                return {
                ...comment,
                attributes: {
                    ...comment.attributes,
                    body, // Update the comment's body
                },
                };
            }

            // If the comment has replies, recursively update them as well
            if (comment.attributes?.replies?.length) {
                return {
                ...comment,
                attributes: {
                    ...comment.attributes,
                    replies: comment.attributes.replies.map((reply:CommentData) =>
                    updateComment(reply, commentId, body) // Recursively update replies
                    ),
                },
                };
            }

            return comment; // Return unchanged if not the comment or reply
            };

            // Apply the recursive update to all comments and replies
            return {
            ...old,
            pages: old.pages.map((page) => ({
                ...page,
                data: page.data.map((comment) =>
                updateComment(comment, commentId, payload.data.attributes.body)
                ),
            })),
            };
        });

        return { previousComments };
        },

    onError: (error, _, context) => {
      if (context?.previousComments) {
        queryClient.setQueryData([field, id, "comments"], context.previousComments);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [field, id, "comments"] });
    },
  });
};
