'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Compass, Bell, Newspaper, Atom,Plus, Library } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '../ui/button'
import brandIcon from '@/assets/chate-set.svg'
import { useLocation, useNavigate } from 'react-router-dom'
import { ScrollArea } from "@/components/ui/scroll-area"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { useAuth } from '@/hooks/useAuth'
import SidebarLeft from '@/assets/svg/SidebarLeft'
import SidebarRight from '@/assets/svg/SidebarRight'

interface NavItem {
    icon: React.ElementType,
    label: string,
    href: string,
}

const navItems: NavItem[] = [
    { icon: Newspaper, label: 'Posts', href: '/posts' },
    { icon: Compass, label: 'Explore', href: '/explore' },
    { icon: Plus, label: 'Create', href: '/posts/create' },
    { icon: Library, label: 'My Library', href: '/my-library' },
    { icon: Atom, label: 'Groups', href: '/groups' },
]

const AuthenticatedNav = () => {

    const navigate = useNavigate();
    const isAuthenticated = useAuth();

    const [activeTab, setActiveTab] = React.useState(0);
    const [isCollapsed, setIsCollapsed] = React.useState(false);

    const location = useLocation();
    React.useEffect(() => {
        const path = location.pathname;
        const index = navItems.findIndex((item) => item.href === path);
        setActiveTab(index);
    }, [location.pathname]);

    const handleClickLogo = () => {
        if (isAuthenticated) {
            navigate('/posts');
        } else {
            navigate('/');
        }
    }

    return (
        <>
            {/* sidenav for large screens / desktop */}
            <nav className='hidden md:block border-r dark:bg-gray-950 p-4'>
                <motion.div
                    className={cn(
                        "relative flex min-h-screen flex-col ",
                        isCollapsed ? "w-[80px]" : "w-[240px]"
                    )}
                    animate={{ width: isCollapsed ? 80 : 240 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                    <div className="flex items-center justify-between cursor-pointer">
                        <div className="flex items-center gap-2" onClick={handleClickLogo}>
                            <img src={brandIcon} alt="brand icon" width={50} height={50} />

                            <motion.div
                                className=""
                                animate={{ opacity: isCollapsed ? 0 : 1 }}
                                transition={{ duration: .2 }}

                            >

                                {!isCollapsed && <span className="text-xl font-bold">ChateSet</span>}
                            </motion.div>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 border-[1.5px] "
                            onClick={() => setIsCollapsed(!isCollapsed)}
                        >
                            {isCollapsed ? <SidebarRight /> : <SidebarLeft />}
                            
                        </Button>
                    </div>
                    <ScrollArea className="flex-grow py-4">
                        <nav className="grid gap-2">
                            <TooltipProvider delayDuration={0}>
                                {navItems.map((item, index) => {

                                    const Icon = item.icon
                                    const isActive = activeTab === index
                                    return (
                                        item.label !== 'Create' &&
                                        <Tooltip key={index}>
                                            <TooltipTrigger asChild>
                                                <a
                                                    href={item.label}
                                                    onClick={(e) => { e.preventDefault(); setActiveTab(index); navigate(item.href) }}
                                                    className={cn(
                                                        "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent dark:hover:bg-gray-800 hover:text-accent-foreground",
                                                        isActive ? "bg-accent dark:bg-gray-800" : "transparent",
                                                        isCollapsed ? "justify-center " : "justify-start"
                                                    )}
                                                >
                                                    <Icon className="h-5 w-5" />
                                                    {!isCollapsed && (
                                                        <span className="ml-3">{item.label}</span>
                                                    )}
                                                    {isActive && (
                                                        <motion.div
                                                            className="absolute left-0 h-8 w-1 rounded-r-full bg-primary"
                                                            layoutId="activeNavIndicator"
                                                            initial={{ opacity: 0 }}
                                                            animate={{ opacity: 1 }}
                                                            exit={{ opacity: 0 }}
                                                            transition={{
                                                                type: "spring",
                                                                stiffness: 380,
                                                                damping: 30,
                                                            }}
                                                        />
                                                    )}
                                                </a>
                                            </TooltipTrigger>
                                            <TooltipContent side="right" className={`${isCollapsed == true ? 'flex' : 'hidden'}  items-center gap-4`}>
                                                {item.label}
                                            </TooltipContent>
                                        </Tooltip>
                                    )

                                })}
                            </TooltipProvider>
                        </nav>
                    </ScrollArea>

                </motion.div>
            </nav>
            {/* mobile bottom nav here  */}
            <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t bg-background/90 backdrop-blur-lg md:hidden">

                {navItems.map((item, index) => {
                    const Icon = item.icon;
                    return (
                        item.label !== 'Create' ? (
                            <a
                                key={index}
                                onClick={(e) => { e.preventDefault(); setActiveTab(index); navigate(item.href) }}
                                className={cn(
                                    'relative flex h-full w-full flex-col items-center justify-center gap-1',
                                    activeTab === index ? 'text-primary' : 'text-muted-foreground'
                                )}
                            >
                                {activeTab === index && <motion.div
                                    className="absolute w-10 top-0  h-0.5 bg-primary"
                                    layoutId='activeTab'
                                    transition={
                                        { type: 'spring', stiffness: 400, damping: 25 }
                                    }
                                />}
                                <motion.div
                                    initial={false}
                                    animate={{
                                        scale: activeTab === index ? 1 : 0.9,
                                        y: activeTab === index ? -4 : 0,
                                    }}
                                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                                >
                                    <Icon className="h-5 w-5" />
                                </motion.div>
                                <motion.span
                                    className="absolute bottom-1 text-[10px]"
                                    initial={false}
                                    animate={{
                                        opacity: activeTab === index ? 1 : 0,
                                        y: activeTab === index ? 0 : 4,
                                    }}
                                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                                >
                                    {item.label}
                                </motion.span>

                            </a>
                        ) : (
                            <div key={index} className="relative flex h-full w-full flex-col items-center justify-center gap-1">
                                <button
                                    onClick={() => navigate('/posts/create')}
                                    className='p-2 rounded-lg bg-zinc-800 text-white border border-neutral-600 shadow-sm dark:bg-neutral-800  dark:text-white dark:border dark:border-neutral-600 active:scale-95 transition-transform'
                                >
                                    <Icon className="h-5 w-5" />
                                </button>
                            </div>

                        )

                    )
                })}
            </nav>
        </>
    )
}

export default AuthenticatedNav