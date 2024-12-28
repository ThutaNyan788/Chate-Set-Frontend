import React from 'react';
import PostCard from '@/_components/PostCard';
import JsImage from "@/assets/javascript.png"
import AuthenticatedLayout from '@/components/layout/AuthenticatedLayout';
import { usePostsData } from '@/hooks/usePostsData';
import { PostData } from '@/models/Models';
import PostSkeleton from '@/components/skeleton/PostSkeleton';



const Posts: React.FC = () => {
  const { data: posts, error, isLoading } = usePostsData();


  return (
    
     <AuthenticatedLayout>
      <div className="container mx-auto">
        {
          isLoading &&
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
          {posts?.map((post, index) => (
            <PostCard key={index} post={post} />
          ))}
      </div>
      </div>
    </AuthenticatedLayout>
    

  );
};

export default Posts;
