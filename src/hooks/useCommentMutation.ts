import {  useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "@/utils/axios";
import { CommentData, CommentPayload } from "@/models/Models";

const storeComment = (field:string,id:number,payload:CommentPayload) => {
    return axios.post(`/users/comments/${field}/${id}/store`, payload, {
        headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
}

export const useCommentMutation = (
    field: string, // Polymorphic type 
    id: number    // Polymorphic ID
) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload: CommentPayload) => storeComment(field,id,payload),
        //handle optimistic updates
        onMutate: async (newComment) => {
            const cacheKey = [field, id, 'comments'];
            await queryClient.cancelQueries({ queryKey: cacheKey });

            const previousComments = queryClient.getQueriesData<CommentData[]>({ queryKey: cacheKey });
        
            queryClient.setQueryData(cacheKey, (old:CommentData[] = []) => ({
                ...old,
                data: [
                    ...old,
                    {
                        type: 'comment',
                        id: Date.now(), // Temporary ID
                        attributes: {
                            ...newComment.data.attributes,
                            id: Date.now(),
                            likes_count: 0,
                            is_liked: false,
                            replies: [],
                            user: {
                                id: 1, // Replace with the authenticated user ID
                                name: 'Your Name', // Replace with authenticated user info
                                profile_photo_path: null,
                            },
                            created_at: new Date().toISOString(),
                            updated_at: new Date().toISOString(),
                        },
                    },
                ],
            }));
        
            return { previousComments };

        },
        // Rollback on Error
        onError: (error, newComment, context) => {
            if (context?.previousComments) {
            queryClient.setQueryData([field, id, 'comments'], context.previousComments);
            }
        },
        // Invalidate on Success
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: [field, id, 'comments'],
            });
        },
    
    })
}