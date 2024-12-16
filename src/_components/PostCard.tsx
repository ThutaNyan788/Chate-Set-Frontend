import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Bookmark, Heart, Link2, MessageCircle } from 'lucide-react'
import { Link } from "react-router-dom"

interface PostCardProps {
    author: {
        name: string
        avatar: string
    }
    date: string
    readTime: string
    title: string
    tags: string[]
    image: string
    stats: {
        likes: number
        comments: number
    }
}

export function PostCard({
    author,
    date,
    readTime,
    title,
    tags,
    image,
    stats,
}: PostCardProps) {
    return (
        <Card className="w-full bg-white shadow dark:bg-gray-900 dark:text-white border dark:border-gray-700 overflow-hidden">
            <CardHeader className="space-y-4">
                <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                        <AvatarImage src={author.avatar} alt={author.name} />
                        <AvatarFallback>{author.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-2">
                        <h3 className="font-medium leading-none">{author.name}</h3>
                        <p className="text-sm text-gray-400">
                            {readTime} • {date}
                        </p>
                    </div>
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-[#00E5B5]">{title}</h2>
                <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                        <Link to="/" key={tag}>
                            <Badge
                                key={tag}
                                variant="secondary"
                                className="bg-gray-900 dark:border-gray-700 hover:bg-[#1A2333] text-gray-300"
                            >
                                #{tag}
                            </Badge>
                        </Link>
                    ))}
                </div>
            </CardHeader>
            <CardContent>
                <div className="rounded-lg overflow-hidden">
                    <img
                        src={image}
                        alt="Post cover"
                        className="w-full h-40 md:h-48 object-cover"
                    />
                </div>
            </CardContent>
            <CardFooter>
                <div className="flex space-x-2 md:space-x-4">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-400 hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700 border-[1.3px] dark:border-gray-600 rounded-lg"
                    >
                        <Heart className="mr-1 h-4 w-4" />
                        <span className="text-xs md:text-sm">{stats.likes}k</span>
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-400 hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700 border-[1.3px] dark:border-gray-600 rounded-lg"
                    >
                        <MessageCircle className="mr-1 h-4 w-4" />
                        <span className="text-xs md:text-sm">{stats.comments}</span>
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-400 hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700 border-[1.3px] dark:border-gray-600 rounded-lg"
                    >
                        <Bookmark className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-400 hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700 border-[1.3px] dark:border-gray-600 rounded-lg"
                    >
                        <Link2 className="h-4 w-4" />
                    </Button>
                </div>
            </CardFooter>
        </Card>
    )
}

