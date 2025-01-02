import {  useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "@/utils/axios";
import { PostData } from "@/models/Models";

const toggleBookmarkApi = (postId: number) => {
    return axios.post(`/posts/${postId}/bookmark`, null, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
}



export const useBookmarkMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (postId: number) => toggleBookmarkApi(postId),
        //handle optimistic updates
        onMutate: async (postId: number) => {
            await queryClient.cancelQueries({
                queryKey: ["posts"],
            });
            const previousPosts = queryClient.getQueryData(["posts"]);
            // Optimistically update the `is_bookmarked` state`
            queryClient.setQueryData(["posts"], (oldPosts: PostData[]) =>
                oldPosts.map((post: PostData) =>
                    post.id === postId
                        ? {
                            ...post,
                            attributes: {
                                ...post.attributes,
                                is_bookmarked: !post.attributes.is_bookmarked,
                            }
                        }
                        : post
                )
            );
            return { previousPosts };
        },

        // Rollback if the mutation fails
        onError: (err, postId, context) => {
            // Ensure context is defined before accessing previousPosts
            if (context?.previousPosts) {
                queryClient.setQueryData(["posts"], context.previousPosts);
            }
        },

        // Refetch the posts after mutation success or failure
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ["posts"],
            });
        },
    
    })
}