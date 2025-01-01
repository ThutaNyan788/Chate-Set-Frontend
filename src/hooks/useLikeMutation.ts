import {  useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "@/utils/axios";
import { PostData } from "@/models/Models";

const toggleLikeApi = (postId: number) => {
    return axios.post(`/posts/${postId}/like`, null, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
}



export const useLikeMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (postId: number) => toggleLikeApi(postId),
        //handle optimistic updates
        onMutate: async (postId: number) => {
            await queryClient.cancelQueries({
                queryKey: ["posts"],
            });
            const previousPosts = queryClient.getQueryData(["posts"]);
            // Optimistically update the `is_liked` state and `likes_count`
            queryClient.setQueryData(["posts"], (oldPosts: PostData[]) =>
                oldPosts.map((post: PostData) =>
                    post.id === postId
                        ? {
                            ...post,
                            relationships: {
                                ...post.relationships,
                                likes: {
                                    ...post.relationships.likes,
                                    data: {
                                        ...post.relationships.likes.data,
                                        attributes: {
                                            ...post.relationships.likes.data.attributes,
                                            // Toggle `is_liked`
                                            is_liked: !post.relationships.likes.data.attributes.is_liked,
                                            // Update `likes_count`
                                            likes_count: post.relationships.likes.data.attributes.is_liked
                                                ? post.relationships.likes.data.attributes.likes_count - 1
                                                : post.relationships.likes.data.attributes.likes_count + 1,
                                        },
                                    },
                                },
                            },
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