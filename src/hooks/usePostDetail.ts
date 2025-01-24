import { PostData, ApiResponse } from '@/models/Models';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from '@/utils/axios';


type PostResponse = ApiResponse<PostData>;

const fetchPost = async (slug: string): Promise<PostData> => {
  const response = await axios.get<PostResponse>(`/posts/${slug}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return response.data.data;
};

export const usePostDetail = (slug: string): UseQueryResult<PostData> => {
  return useQuery<PostData>({
    queryKey: ['post', slug], // Ensure unique cache key for each slug
    queryFn: () => fetchPost(slug), // Wrap the function to pass `slug` dynamically
    enabled: !!slug, // Ensure the query runs only if `slug` is provided
  });
};

