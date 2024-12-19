import React from 'react';
import { PostCard } from '@/_components/PostCard';
import JsImage from "@/assets/javascript.png"
import AuthenticatedNav from '@/components/layout/AuthenticatedNav';

const blogPosts = [
  {
    author: { name: "Wai Yan Tun", avatar: "/placeholder.svg?height=40&width=40" },
    date: "Dec 12, 2024",
    readTime: "7m read",
    title: "Get Real Time with Laravel Reverb !",
    tags: ["webdev", "open-source", "laravel"],
    image: JsImage,
    stats: { likes: 29, comments: 45 },
  },
  {
    author: { name: "Jane Doe", avatar: "/placeholder.svg?height=40&width=40" },
    date: "Dec 15, 2024",
    readTime: "5m read",
    title: "Mastering React Hooks",
    tags: ["react", "javascript", "frontend"],
    image: JsImage,
    stats: { likes: 32, comments: 28 },
  },
  {
    author: { name: "John Smith", avatar: "/placeholder.svg?height=40&width=40" },
    date: "Dec 18, 2024",
    readTime: "10m read",
    title: "Building Scalable APIs with Node.js",
    tags: ["nodejs", "backend", "api"],
    image: JsImage,
    stats: { likes: 45, comments: 37 },
  },
  {
    author: { name: "Emma Wilson", avatar: "/placeholder.svg?height=40&width=40" },
    date: "Dec 20, 2024",
    readTime: "6m read",
    title: "CSS Grid: A Complete Guide",
    tags: ["css", "webdesign", "layout"],
    image: JsImage,
    stats: { likes: 38, comments: 22 },
  },
  {
    author: { name: "Alex Johnson", avatar: "/placeholder.svg?height=40&width=40" },
    date: "Dec 22, 2024",
    readTime: "8m read",
    title: "Introduction to GraphQL",
    tags: ["graphql", "api", "database"],
    image: JsImage,
    stats: { likes: 41, comments: 33 },
  },
  {
    author: { name: "Sarah Brown", avatar: "/placeholder.svg?height=40&width=40" },
    date: "Dec 25, 2024",
    readTime: "9m read",
    title: "Optimizing React Performance",
    tags: ["react", "performance", "optimization"],
    image: JsImage,
    stats: { likes: 52, comments: 40 },
  },
]
// PostsResponse type based on ApiResponse


const Posts: React.FC = () => {
  // const { data: posts, error, isLoading } = usePostsData();


  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (error instanceof Error) {
  //   return <div>Error fetching posts: {error.message}</div>;
  // }

  return (
    <>
      <div className="md:flex min-h-screen bg-background">
        <AuthenticatedNav />
        <main>
          <div className="min-h-screen bg-gray-100 dark:bg-gray-950 p-6">
            <div className="container mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogPosts.map((post, index) => (
                  <PostCard key={index} {...post} />
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
      
    </>
    

  );
};

export default Posts;
