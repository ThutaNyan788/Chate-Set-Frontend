import { CommentCollection } from '@/models/Models';
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

      const previousComments = queryClient.getQueryData<InfiniteData<CommentCollection>>(cacheKey);

      queryClient.setQueryData(cacheKey, (old: InfiniteData<CommentCollection> | undefined) => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map((page) => ({
            ...page,
            data: page.data.filter((comment) => comment.id !== commentId),
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
