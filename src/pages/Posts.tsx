import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Post from '@/components/Post';
import { PostData,ApiResponse } from '@/models/PostModel';

// PostsResponse type based on ApiResponse
type PostsResponse = ApiResponse<PostData[]>;

const Posts: React.FC = () => {
  const { data: posts, error, isLoading } = useQuery<PostsResponse>({
    queryKey: ['posts'],
    queryFn: async () => {
      const response = await axios.get<PostsResponse>('http://127.0.0.1:8000/api/v1/posts/');
      return response.data;
    }
  });


  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error instanceof Error) {
    return <div>Error fetching posts: {error.message}</div>;
  }

  return (
    <div>
      <h1>Posts</h1>
      <div>
        {posts?.data.map((post) => (
            <Post key={post.id} post={post}></Post>
        ))}
      </div>
    </div>
  );
};

export default Posts;
