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
        <Card className="w-full bg-[#0B1221] text-white border border-gray-700 rounded-lg overflow-hidden">
            <CardHeader className="space-y-3">
                <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                        <AvatarImage src={author.avatar} alt={author.name} />
                        <AvatarFallback>{author.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
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
                                className="bg-[#1A2333] hover:bg-[#1A2333] text-gray-300"
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
                        className="text-gray-400 hover:text-white hover:bg-[#1A2333] border border-gray-600"
                    >
                        <Heart className="mr-1 md:mr-2 h-4 w-4" />
                        <span className="text-xs md:text-sm">{stats.likes}k</span>
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-400 hover:text-white hover:bg-[#1A2333] border border-gray-600"
                    >
                        <MessageCircle className="mr-1 md:mr-2 h-4 w-4" />
                        <span className="text-xs md:text-sm">{stats.comments}</span>
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-400 hover:text-white hover:bg-[#1A2333] border border-gray-600"
                    >
                        <Bookmark className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-400 hover:text-white hover:bg-[#1A2333] border border-gray-600"
                    >
                        <Link2 className="h-4 w-4" />
                    </Button>
                </div>
            </CardFooter>
        </Card>
    )
}

