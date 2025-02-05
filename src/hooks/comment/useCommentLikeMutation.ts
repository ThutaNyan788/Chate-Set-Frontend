import {  InfiniteData, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "@/utils/axios";
import { CommentCollection, CommentData } from "@/models/Models";

const toggleLikeApi = (field: string, id: number) => {
  return axios.post(`/${field}/${id}/like`, null, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};



export const useCommentLikeMutation = (field: string, cacheKey: any[]) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => toggleLikeApi(field, id),

   onMutate: async (id: number) => {
    // Cancel ongoing queries to prevent them from overriding optimistic updates
    await queryClient.cancelQueries({ queryKey: cacheKey });

    // Store the previous state in case of rollback
    const previousData = queryClient.getQueryData(cacheKey);

    // Update the query cache optimistically
    queryClient.setQueryData(cacheKey, (oldData: InfiniteData<CommentCollection > | undefined) => {
      if (!oldData) return oldData;

      // Recursive function to update the item (for comments with replies)
      const updateItem = (item: CommentData, id: number): any => {
        if (item.id === id) {
          return {
            ...item,
            relationships: {
              ...item.relationships,
              likes: {
                data: {
                  type: "likes",
                  attributes: {
                    liked: item.relationships.likes?.data?.attributes?.liked ? 0 : 1,
                    count: item.relationships.likes?.data?.attributes?.liked
                      ? item.relationships.likes.data.attributes.count - 1
                      : item.relationships.likes.data.attributes.count + 1,
                  },
                },
              },
            },
          };
        }

        // 🔥 If it's a comment and has replies, recursively update them
        if ('replies' in item.attributes && item.attributes.replies.length) {
          return {
            ...item,
            attributes: {
              ...item.attributes,
              replies: item.attributes.replies.map((reply:CommentData) => updateItem(reply, id)), //  Recursive update for replies
            },
          };
        }

        return item; // Return unchanged if it's a post or a comment without replies
      };

      return {
        ...oldData,
        pages: oldData.pages.map((page) => ({
          ...page,
          data: page.data.map((item) => updateItem(item, id)), //  Apply the recursive update function
        })),
      };
    });

    return { previousData }; // Return previous state for rollback in case of failure
  },

    // Rollback on error
    onError: (err, id, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(cacheKey, context.previousData);
      }
    },

    // Invalidate the query to refetch the latest data
    onSettled: () => {
      // queryClient.invalidateQueries({ queryKey: cacheKey });
    },
  });
};
