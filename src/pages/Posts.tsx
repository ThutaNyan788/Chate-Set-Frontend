import React from 'react';
import Post from '@/components/Post';
import { usePostsData } from '@/hooks/usePostsData';


// PostsResponse type based on ApiResponse


const Posts: React.FC = () => {
  const { data: posts, error, isLoading } = usePostsData();


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
        {posts?.data.map((post:any) => (
            <Post key={post.id} post={post}></Post>
        ))}
      </div>
    </div>
  );
};

export default Posts;
