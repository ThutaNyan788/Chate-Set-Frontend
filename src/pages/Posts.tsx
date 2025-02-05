import React, { useEffect } from 'react';
import PostCard from '@/components/post/PostCard';
import PostSkeleton from '@/components/skeleton/PostSkeleton';
import { useBookmarkMutation } from '@/hooks/useBookmarkMutation';
import { useInfinitePosts } from '@/hooks/post/useInfinitePosts';
import { useInView } from 'react-intersection-observer';
import { usePostLikeMutation } from '@/hooks/post/usePostLikeMutation';


const Posts: React.FC = () => {

  const { data: posts, error, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading: isPostLoading } = useInfinitePosts();

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);


  const allPosts = posts?.pages.flatMap((page) => page.data) || [];

  // Use the custom hook for liking a post
  const { mutate: toggleLike, error: likeError } = usePostLikeMutation('posts', ['posts']);
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
        isPostLoading &&
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 9 }).map((_, index) => (
            <PostSkeleton key={index} />
          ))}
        </div>
      }
      {
        error && <div>Error fetching posts</div>
      }
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {allPosts.length > 0 ? (
          allPosts.map((post, index) => {
            return (

              // <p key={post.id} ref={allPosts.length === index + 1 ? ref : undefined}  >{ post.id } | {post.attributes.title}</p>
              <PostCard
                innerRef={allPosts.length === index + 1 ? ref : undefined}  // Only pass ref to the last item
                key={post.id}
                post={post}
                isPostLoading={isPostLoading}
                fetchNextPage={fetchNextPage}
                hasNextPage={hasNextPage}
                isFetchingNextPage={isFetchingNextPage}
                onLikeToggle={() => handleLikeToggle(post.id)}
                onBookmarkToggle={() => handleBookmarkToggle(post.id)}
              />
            );
          })
        ) : (
          <p className="text-gray-500">No posts yet.</p>
        )}

        {isFetchingNextPage ? "Loading..." : ""}
      </div>
    </div>

  );
};

export default Posts;
