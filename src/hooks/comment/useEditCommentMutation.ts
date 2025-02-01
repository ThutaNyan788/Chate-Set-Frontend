import { CommentCollection, CommentPayload } from "@/models/Models";
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
      await queryClient.cancelQueries({ queryKey: cacheKey });

      const previousComments = queryClient.getQueryData<InfiniteData<CommentCollection>>(cacheKey);

        queryClient.setQueryData(cacheKey, (old: InfiniteData<CommentCollection> | undefined) => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map((page) => ({
            ...page,
            data: page.data.map((comment) =>
              comment.id === commentId
                ? {
                    ...comment,
                    attributes: { ...comment.attributes, body: payload.data.attributes.body },
                  }
                : comment
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
