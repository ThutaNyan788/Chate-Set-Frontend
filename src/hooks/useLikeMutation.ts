import {  useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "@/utils/axios";
import { CommentCollection, PostCollection, PostData } from "@/models/Models";

const toggleLikeApi = (field: string, id: number) => {
  return axios.post(`/${field}/${id}/like`, null, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};



export const useLikeMutation = (field: string, cacheKey: any[]) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => toggleLikeApi(field, id),

    // Handle optimistic updates
    onMutate: async (id: number) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: cacheKey });

      const previousData = queryClient.getQueryData(cacheKey);

      queryClient.setQueryData(cacheKey, (oldData: any | undefined) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          data: oldData.data.map((item: any) =>
            item.id === id
              ? {
                  ...item,
                  relationships: {
                    ...item.relationships,
                    likes: {
                      data: {
                        type: "likes",
                        attributes: {
                          // Toggle `liked`
                          liked: !item.relationships.likes?.data?.attributes?.liked,
                          // Update `count`
                          count: item.relationships.likes?.data?.attributes?.liked
                            ? item.relationships.likes.data.attributes.count - 1
                            : item.relationships.likes.data.attributes.count + 1,
                        },
                      },
                    },
                  },
                }
              : item
          ),
        };
      });

      return { previousData };
    },

    // Rollback on error
    onError: (err, id, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(cacheKey, context.previousData);
      }
    },

    // Invalidate the query to refetch the latest data
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: cacheKey });
    },
  });
};
