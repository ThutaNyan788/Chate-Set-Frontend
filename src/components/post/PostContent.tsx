import { PostData } from '@/models/Models';
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import ReactMarkdown from 'react-markdown';
import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';
import { format } from 'date-fns';

interface PostContentProps {
    post: PostData;
}

const PostContent: React.FC<PostContentProps> = ({ post }) => {
    const data = post.attributes;
    const author = post.includes.author.attributes;
    // const like_count = post.relationships.likes.likes_count;
    // const is_liked = post.relationships.likes.is_liked;
    // const is_bookmarked = post.attributes.is_bookmarked;

    const getImageUrl = (thumbnail: string) => {
        if (thumbnail && thumbnail.startsWith('http')) {
            return thumbnail;
        }
        return import.meta.env.VITE_API_STORAGE_URL + thumbnail;
    }

    return (
        <div className=' border-b pb-4 mb-3'>
            <header className="mb-8">
                <h1 className="text-4xl font-bold mb-4">{data.title}</h1>
                <div className="flex items-center space-x-4">
                    <Avatar>
                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Author" />
                        <AvatarFallback>{author.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-semibold">{author.name}</p>
                        <p className="text-sm text-gray-500">Published on {format(data.created_at, "MMM dd, yyyy")} · {data.read_time} min read</p>
                    </div>
                </div>
            </header>

            <img
                src={getImageUrl(data.thumbnail)}
                alt="Blog post cover image"
                className="w-full h-[300]  rounded-lg mb-8 "
            />

            <article className="markdown-body">
                <ReactMarkdown
                    rehypePlugins={[rehypeSanitize]}
                    remarkPlugins={[remarkGfm]}
                >
                    {data.content}
                </ReactMarkdown>
            </article>
        </div>
    )
}

export default PostContent