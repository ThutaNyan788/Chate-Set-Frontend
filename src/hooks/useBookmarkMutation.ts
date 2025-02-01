import {  InfiniteData, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "@/utils/axios";
import { PostCollection, PostData } from "@/models/Models";

const toggleBookmarkApi = (field: string, id: number) => {
    return axios.post(`/${field}/${id}/bookmark`, null, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
}



export const useBookmarkMutation = (field: string, cacheKey: any[]) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => toggleBookmarkApi(field, id),

    // Handle optimistic updates
    onMutate: async (id: number) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: cacheKey });

      const previousData = queryClient.getQueryData(cacheKey);

      queryClient.setQueryData(['posts'], (oldData: InfiniteData<PostCollection>) => {
        if (!oldData) return oldData;

        // Update all pages
        const updatedPages = oldData.pages.map((page) => {
            return {
                ...page,
                data: page.data.map((item) =>
                      item.id === id
                          ? {
                                ...item,
                                attributes: {
                                    ...item.attributes,
                                    is_bookmarked: !item.attributes.is_bookmarked, // Toggle bookmark status
                                },
                            }
                          : item
                  ),
              };
          });

          return {
              ...oldData,
              pages: updatedPages,
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