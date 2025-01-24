import { PostData } from '@/models/Models';
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import TestImage from "@/assets/javascript.png"
import ReactMarkdown from 'react-markdown';
import rehypeSanitize from 'rehype-sanitize';

interface PostContentProps {
    post: PostData;
}

const PostContent: React.FC<PostContentProps> = ({ post }) => {
    const data = post.attributes;
    const author = post.includes.author.attributes;
    const like_count = post.relationships.likes.likes_count;
    const is_liked = post.relationships.likes.is_liked;
    const is_bookmarked = post.attributes.is_bookmarked;

    return (
        <div>
            <header className="mb-8">
                <h1 className="text-4xl font-bold mb-4">{data.title}</h1>
                <div className="flex items-center space-x-4">
                    <Avatar>
                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Author" />
                        <AvatarFallback>{author.name}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-semibold">{author.name}</p>
                        <p className="text-sm text-gray-500">Published on {data.created_at} · {data.read_time} min read</p>
                    </div>
                </div>
            </header>

            <img
                src={TestImage}
                alt="Blog post cover image"
                className="w-full h-[300]  rounded-lg mb-8 "
            />

            <article className="text-lg leading-relaxed space-y-6">
                <ReactMarkdown rehypePlugins={[rehypeSanitize]}>{data.content}</ReactMarkdown>
            </article>
        </div>
    )
}

export default PostContent