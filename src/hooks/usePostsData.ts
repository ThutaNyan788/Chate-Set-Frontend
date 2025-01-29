import { PostCollection } from '@/models/Models';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from '@/utils/axios';


type PostsResponse = PostCollection;

const fetchPosts = async () => {
    const response = await axios.get<PostsResponse>('/posts', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
    return response.data;
}

export const usePostsData = (): UseQueryResult<PostCollection> => {
    return useQuery<PostCollection>({
        queryKey: ['posts'],
        queryFn: fetchPosts
    });
}