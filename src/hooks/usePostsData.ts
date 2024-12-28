import { PostData, ApiResponse } from '@/models/Models';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from '@/utils/axios';


type PostsResponse = ApiResponse<PostData[]>;

const fetchPosts = async () => {
    const response = await axios.get<PostsResponse>('/posts', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
    return response.data.data;
}

export const usePostsData = (): UseQueryResult<PostData[]> => {
    return useQuery<PostData[]>({
        queryKey: ['posts'],
        queryFn: fetchPosts
    });
}