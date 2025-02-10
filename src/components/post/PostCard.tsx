import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { PostData } from "@/models/Models"
import {  Heart, MessageCircle } from 'lucide-react'
import { Link, useNavigate } from "react-router-dom"
import { format } from 'date-fns';

import { motion } from "framer-motion"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuGroup
} from "@/components/ui/dropdown-menu"
import { MoreVertical, Share2, Eye, UserPlus, Flag } from 'lucide-react'
import CopyLinkButton from "./CopyLinkButton"
import { useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import Comments from "@/components/comment/components/Comments"
import { mockComments } from './../comment/mockData';
import LikeButton from "../ui/LikeButton"
import BookmarkButton from "../ui/BookmarkButton"
import { useInfiniteComments } from "@/hooks/comment/useInfiniteComments"
import CommentSection from "../comment/CommentSection"

interface PostCardProps {
    post: PostData;
    innerRef?: React.Ref<HTMLParagraphElement>
    onLikeToggle: () => void;
    onBookmarkToggle: () => void;
    isPostLoading?: boolean;
    fetchNextPage: () => void;
    hasNextPage?: boolean;
    isFetchingNextPage?: boolean;
}



const PostCard: React.FC<PostCardProps> = ({ post, innerRef, onLikeToggle, onBookmarkToggle, isPostLoading, fetchNextPage, hasNextPage, isFetchingNextPage }) => {
    const data = post.attributes;
    const author = post.includes.author.attributes;
    const likes_count = post.relationships.likes.data.attributes.count;
    const comments_count = post.relationships.comments.data.attributes.count;
    const is_liked = post.relationships.likes.data.attributes.liked;
    const is_bookmarked = post.attributes.is_bookmarked;
    const [openComments, setOpenComments] = useState(false); // Dialog comments for later implementation

    //fetch comments when comment modal is open
    const {
        data: infinite_comments,
        fetchNextPage : fetchNextPageComments,
        hasNextPage :  hasNextPageComments,
        isFetchingNextPage : isFetchingNextPageComments,
        isLoading: isCommentsLoading
    } = useInfiniteComments("posts", post?.id, {
        enabled: openComments, // ✅ Fetch only when modal is open
    });

    const navigate = useNavigate();
    const handleNavigate = (e: React.MouseEvent) => {
        if ((e.target as HTMLElement).closest(".interaction")) return;
        navigate(`/posts/${data.slug}`);
    }

    const [isLiked, setIsLiked] = useState(is_liked);

    const handleLikeToggle = () => {
        setIsLiked(!isLiked);
        onLikeToggle();
    }

    const getImageUrl = (thumbnail: string) => {
        if (thumbnail.startsWith('http')) {
            return thumbnail;
        }
        return import.meta.env.VITE_API_STORAGE_URL + thumbnail;
    }

    return (
        <div ref={innerRef}>
            <Card onClick={handleNavigate} className="w-full max-h-[450px] bg-white shadow-none hover:shadow-lg dark:shadow-lg dark:bg-gray-900 dark:text-white border dark:hover:border-gray-600 overflow-hidden">
                <CardHeader className="space-y-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                            <Avatar className="h-12 w-12">
                                <AvatarImage src={author.profile_photo_path ?? ''} alt={author.name} />
                                <AvatarFallback>{author.name[0]}</AvatarFallback>
                            </Avatar>

                            <div className="space-y-2">
                                <h3 className="font-medium leading-none line-clamp-1">{author.name}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {data.read_time} m read • {format(data.created_at, "MMM dd, yyyy")}
                                </p>
                            </div>
                        </div>


                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none">
                                    <MoreVertical className="h-5 w-5" />
                                    <span className="sr-only">More options</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56 dark:bg-gray-900">
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                        <Share2 className="mr-2 h-4 w-4" />
                                        <span>Share via</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Eye className="mr-2 h-4 w-4" />
                                        <span>Hide</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <UserPlus className="mr-2 h-4 w-4" />
                                        <span>Follow {author.name}</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="text-red-600 dark:text-red-400">
                                        <Flag className="mr-2 h-4 w-4" />
                                        <span>Report</span>
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>

                    </div>
                    <h2 className="line-clamp-2 text-xl md:text-2xl font-bold text-black dark:text-[#00E5B5]">{data.title}</h2>
                    <div className="flex flex-wrap gap-2 overflow-hidden h-7">
                        {data.tags.map((tag, index) => (
                            <Link to="/" key={`${tag}-${index}`}>
                                <Badge
                                    key={`${tag}-${index}`}
                                    variant="secondary"
                                    className="bg-gray-50 dark:bg-gray-900 border-gray-400 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-[#1A2333] text-gray-700 dark:text-gray-300"
                                >
                                    #{tag}
                                </Badge>
                            </Link>
                        ))}
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="rounded-lg overflow-hidden">
                        {/* <img
                        src={data.img_url}
                        alt="Post cover"
                        className="w-full h-36 md:h-40 object-cover"
                    /> */}
                        <img
                            src={getImageUrl(data.thumbnail)}
                            alt="Post cover"
                            className="w-full h-36 md:h-40 object-cover"
                        />
                    </div>
                </CardContent>
                <CardFooter>
                    <div className="flex space-x-2 md:space-x-4 interactions">
                        {/* <LikeButton isLiked={isLiked} likesCount={likes_count} onLikeToggle={handleLikeToggle} /> */}
                        <Button
                            onClick={() => handleLikeToggle()}
                            variant="ghost"
                            size="sm"
                            className="interaction text-gray-700 dark:text-gray-400 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700 border-[1.3px] dark:border-gray-600 rounded-lg"
                        >
                            <Heart className={`mr-1 h-4 w-4 ${isLiked ? "fill-current text-red-500" : ""}`} />
                            <span className="text-xs md:text-sm">{likes_count}</span>
                        </Button>

                        {/* Dialog comments for later implementation */}
                        <Dialog
                            open={openComments}
                            onOpenChange={setOpenComments}
                            
                        >
                            <DialogTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="interaction text-gray-700 dark:text-gray-400 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700 border-[1.3px] dark:border-gray-600 rounded-lg"
                                >
                                    <MessageCircle className="mr-1 h-4 w-4" />
                                    <span className="text-xs md:text-sm">{comments_count}</span>
                                </Button>
                            </DialogTrigger>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                            >
                            <DialogContent
                                className="w-full dark:bg-gray-950 max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto my-auto p-4 sm:p-6 rounded-lg shadow-xl max-h-[90vh] overflow-hidden"
                                onClick={(e) => e.stopPropagation()}
                                aria-describedby={undefined}
                            >
                                
                                    <DialogHeader className="flex flex-row items-center justify-between border-b pb-3">
                                        <DialogTitle className="text-lg sm:text-xl font-semibold">
                                            Comments ({comments_count})
                                        </DialogTitle>
                                    </DialogHeader>

                                    {/* Fetch comments only when modal is open */}
                                    {openComments && (
                                        <CommentSection
                                            field="posts"
                                            current={post}
                                            comments={infinite_comments}
                                            isCommentLoading={isCommentsLoading}
                                            fetchNextPage={fetchNextPageComments}
                                            hasNextPage={hasNextPageComments}
                                            isFetchingNextPage={isFetchingNextPageComments}
                                        />
                                    )}
                                
                            </DialogContent>
                        </motion.div>

                        </Dialog>


                        {/* <Button
                            variant="ghost"
                            size="sm"
                            className="interaction text-gray-700 dark:text-gray-400 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700 border-[1.3px] dark:border-gray-600 rounded-lg"
                        >
                            <MessageCircle className="mr-1 h-4 w-4" />
                            <span className="text-xs md:text-sm">{comments_count}</span>
                        </Button> */}


                        <BookmarkButton isBookmarked={is_bookmarked} onBookmarkToggle={onBookmarkToggle} />
                        <CopyLinkButton link={'http://localhost:5173/posts/' + post.attributes.slug} />
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}

export default PostCard

