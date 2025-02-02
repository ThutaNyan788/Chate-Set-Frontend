import { CommentCollection } from '@/models/Models';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from '@/utils/axios';


type CommentResponse = CommentCollection;

const fetchComments = async (field: string, id: number | null): Promise<CommentCollection> => {
    if (!id) {
        throw new Error("ID is required to fetch comments");
    }
    const response = await axios.get<CommentResponse>(`/comments/${field}/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
    return response.data;
}

export const useComments = (
    field: string, // Polymorphic type
    id: number | null, // Polymorphic ID (nullable)
    options?: { enabled?: boolean } // Optional configuration
): UseQueryResult<CommentCollection> => {
    return useQuery<CommentCollection>({
        queryKey: [field, id, "comments"],
        queryFn: () => fetchComments(field, id),
        enabled: !!id && options?.enabled !== false,
        ...options, // Spread additional options
    });
};


  // Conditionally fetch comments only if post exists
  // const { data: comments, isLoading: isCommentLoading } = useCommentData(
  //   'posts',
  //   post?.id ? post.id : null, {
  //   enabled: !!post?.id,
  // }
  // );