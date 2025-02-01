import { CommentCollection, CommentData } from '@/models/Models';
import axios from '@/utils/axios';
import { InfiniteData, useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteCommentMutation = (field: string, id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (commentId: number) =>
      axios.delete(`/comments/${commentId}/destroy`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }),

    onMutate: async (commentId) => {
        const cacheKey = [field, id, "comments"];
        await queryClient.cancelQueries({ queryKey: cacheKey });

        // Get the previous state of comments
        const previousComments = queryClient.getQueryData<InfiniteData<CommentCollection>>(cacheKey);

        queryClient.setQueryData(cacheKey, (old: InfiniteData<CommentCollection> | undefined) => {
            if (!old) return old;

            // Recursive function to remove a comment or reply, including nested replies
            const removeComment = (comment: any, commentId: number): any => {
            if (comment.id === commentId) {
                return null; // Remove the comment or reply
            }

            // If the comment has replies, remove the matching reply recursively
            if (comment.attributes?.replies?.length) {
                const updatedReplies = comment.attributes.replies
                .map((reply: any) => removeComment(reply, commentId)) // Apply removeComment recursively
                .filter((reply: any) => reply !== null); // Filter out deleted replies

                return {
                ...comment,
                attributes: {
                    ...comment.attributes,
                    replies: updatedReplies, // Update the replies after deletion
                },
                };
            }

            return comment; // Return unchanged if not the comment or reply
            };

            // Apply the removal to all comments and replies (including nested ones)
            return {
            ...old,
            pages: old.pages.map((page) => ({
                ...page,
                data: page.data
                .map((comment) => removeComment(comment, commentId)) // Remove comment or reply recursively
                .filter((comment) => comment !== null), // Filter out the null (deleted) comments
                meta: {
                ...page.meta,
                total_comments: (page.meta.total_comments || 0) - 1,
                },
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
