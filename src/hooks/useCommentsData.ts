import { CommentData, ApiResponse } from '@/models/Models';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from '@/utils/axios';


type CommentResponse = ApiResponse<CommentData[]>;

const fetchComments = async (field: string, id: number | null): Promise<CommentData[]> => {
    if (!id) {
        throw new Error("ID is required to fetch comments");
    }
    const response = await axios.get<CommentResponse>(`/users/comments/${field}/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
    return response.data.data;
}

export const useCommentData = (
    field: string, // Polymorphic type
    id: number | null, // Polymorphic ID (nullable)
    options?: { enabled?: boolean } // Optional configuration
): UseQueryResult<CommentData[]> => {
    return useQuery<CommentData[]>({
        queryKey: [field, id, 'comments'],
        queryFn: () => fetchComments(field, id),
        enabled: !!id && options?.enabled !== false,
        ...options, // Spread additional options
    });
};