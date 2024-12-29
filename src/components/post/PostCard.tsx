import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { PostData } from "@/models/Models"
import { Bookmark, Heart, Link2, MessageCircle } from 'lucide-react'
import { Link, useNavigate } from "react-router-dom"

interface PostCardProps {
    post: PostData;
}



const PostCard: React.FC<PostCardProps> = ({ post }) => {
    const data = post.attributes;
    const author = post.includes.author.attributes;

    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate(`/posts/${post.id}`);
    }


    return (
            <Card onClick={handleNavigate} className="w-full max-h-[450px] bg-white shadow-none hover:shadow-lg dark:shadow-lg dark:bg-gray-900 dark:text-white border dark:border-gray-700 overflow-hidden">
                <CardHeader className="space-y-4">
                    <div className="flex items-center space-x-3">
                        <Avatar className="h-12 w-12">
                            <AvatarImage src={author.profile_photo_path} alt={author.name} />
                            <AvatarFallback>{author.name[0]}</AvatarFallback>
                        </Avatar>
                        
                        <div className="space-y-2">
                        <h3 className="font-medium leading-none line-clamp-1">{author.name}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                {data.read_time} m read • {data.created_at}
                            </p>
                        </div>
                    </div>
                <h2 className="line-clamp-2 text-xl md:text-2xl font-bold text-black dark:text-[#00E5B5]">{data.title}</h2>
                <div className="flex flex-wrap gap-2 overflow-hidden h-6">
                        {data.tags.map((tag) => (
                            <Link to="/" key={tag}>
                                <Badge
                                    key={tag}
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
                        <img
                            src={data.img_url}
                            alt="Post cover"
                            className="w-full h-36 md:h-40 object-cover"
                        />
                    </div>
                </CardContent>
                <CardFooter>
                    <div className="flex space-x-2 md:space-x-4">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-700 dark:text-gray-400 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700 border-[1.3px] dark:border-gray-600 rounded-lg"
                        >
                            <Heart className="mr-1 h-4 w-4" />
                            <span className="text-xs md:text-sm">4k</span>
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-700 dark:text-gray-400 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700 border-[1.3px] dark:border-gray-600 rounded-lg"
                        >
                            <MessageCircle className="mr-1 h-4 w-4" />
                            <span className="text-xs md:text-sm">3</span>
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-700 dark:text-gray-400 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700 border-[1.3px] dark:border-gray-600 rounded-lg"
                        >
                            <Bookmark className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-700 dark:text-gray-400 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700 border-[1.3px] dark:border-gray-600 rounded-lg"
                        >
                            <Link2 className="h-4 w-4" />
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        )
}

export default PostCard

