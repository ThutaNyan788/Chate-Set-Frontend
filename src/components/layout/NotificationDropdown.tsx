"use client"

import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"

export default function NotificationDropdown() {
    return (
        <div className="flex items-center">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative">
                        <Bell className="h-5 w-5" />
                        <Badge
                            className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center bg-purple-500 hover:bg-purple-600"
                            variant="secondary"
                        >
                            3
                        </Badge>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[380px] bg-zinc-900 border-zinc-800">
                    <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800">
                        <h2 className="text-sm font-semibold">Notifications</h2>
                        <Button variant="ghost" size="sm" className="text-xs text-zinc-400 hover:text-white">
                            Mark all as read
                        </Button>
                    </div>
                    <ScrollArea className="h-[400px]">
                        {notifications.map((notification, index) => (
                            <DropdownMenuItem key={index} className="flex items-start gap-4 p-4 cursor-pointer hover:bg-zinc-800">
                                <div className="h-8 w-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                                    {notification.icon}
                                </div>
                                <div className="flex-1 space-y-1">
                                    <p className="text-sm font-medium leading-none">{notification.title}</p>
                                    <p className="text-sm text-zinc-400">{notification.description}</p>
                                    <p className="text-xs text-zinc-500">{notification.time}</p>
                                </div>
                            </DropdownMenuItem>
                        ))}
                    </ScrollArea>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

const notifications = [
    {
        icon: <Bell className="h-4 w-4 text-purple-500" />,
        title: "New Article: React Server Components",
        description: "Learn how to use React Server Components in your Next.js application",
        time: "2 minutes ago",
    },
    {
        icon: <Bell className="h-4 w-4 text-purple-500" />,
        title: "TypeScript 5.0 Released",
        description: "Explore the new features and improvements in TypeScript 5.0",
        time: "1 hour ago",
    },
    {
        icon: <Bell className="h-4 w-4 text-purple-500" />,
        title: "Popular: CSS Grid Tutorial",
        description: "Master CSS Grid with this comprehensive guide",
        time: "2 hours ago",
    },
    {
        icon: <Bell className="h-4 w-4 text-purple-500" />,
        title: "New Discussion: State Management",
        description: "Join the discussion about modern state management in React",
        time: "3 hours ago",
    },
    {
        icon: <Bell className="h-4 w-4 text-purple-500" />,
        title: "Trending: Web Performance",
        description: "Tips and tricks to optimize your web application performance",
        time: "5 hours ago",
    },
]

