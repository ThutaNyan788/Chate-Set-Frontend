import React from 'react';
import PostCard from '@/components/post/PostCard';
import { usePostsData } from '@/hooks/usePostsData';
import PostSkeleton from '@/components/skeleton/PostSkeleton';
import { useLikeMutation } from '@/hooks/useLikeMutation';
import { useBookmarkMutation } from '@/hooks/useBookmarkMutation';


const Posts: React.FC = () => {
  const { data: posts, error: postError, isLoading: postLoading } = usePostsData();
  // Use the custom hook for liking a post
  const { mutate: toggleLike, error: likeError } = useLikeMutation('posts',['posts']);
  const { mutate: toggleBookmark, error: bookmarkError } = useBookmarkMutation('posts', ['posts']);
  
  const handleLikeToggle = async (postId: number) => {
    toggleLike(postId);
  };

  const handleBookmarkToggle = async (postId: number) => {
    toggleBookmark(postId);
  };

  return (

    <div className="container mx-auto">
      {
        postLoading &&
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 9 }).map((_, index) => (
            <PostSkeleton key={index} />
          ))}
        </div>
      }
      {
        postError && <div>Error fetching posts</div>
      }
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts?.data?.map((post, index) => (
          <PostCard
            key={index}
            post={post}
            onLikeToggle={() => handleLikeToggle(post.id)}
            onBookmarkToggle={() => handleBookmarkToggle(post.id)}
          />
        ))}
      </div>
    </div>

  );
};

export default Posts;
