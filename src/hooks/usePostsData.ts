import { PostData, ApiResponse } from '@/models/PostModel';
import { useQuery } from '@tanstack/react-query';
import axios from '@/utils/axios';

type PostsResponse = ApiResponse<PostData[]>;


const fetchPosts = async () => {
    const response = await axios.get<PostsResponse>('/posts');
    return response.data;
  }

export const usePostsData = (): any => {
    return useQuery<PostsResponse>({
        queryKey: ['posts'],
        queryFn: fetchPosts
    });
}