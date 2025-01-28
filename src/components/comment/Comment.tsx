"use client"

import { useState } from "react"
import { Heart, MessageCircle, MoreHorizontal, Edit2, Trash2, X } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { CommentInput } from "./CommentInput"
import { CommentData } from "@/models/Models"

interface CommentProps {
    comment: CommentData;
    onDelete?: (id: number) => void
    onEdit?: (id: number, newContent: string) => void
    onReply?: (id: number, content: string) => void
}

export function Comment({ comment, onDelete, onEdit, onReply }: CommentProps) {
    const [isExpanded, setIsExpanded] = useState(false)
    const [isLiked, setIsLiked] = useState(comment.attributes.is_liked)
    const [likesCount, setLikesCount] = useState(comment.attributes.likes_count)
    const [isEditing, setIsEditing] = useState(false)
    const [isReplying, setIsReplying] = useState(false)
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)

    const toggleReplies = () => setIsExpanded(!isExpanded)

    const handleLike = () => {
        setIsLiked(!isLiked)
        setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1))
    }

    const handleEdit = (newContent: string) => {
        onEdit?.(comment.id, newContent)
        setIsEditing(false)
    }

    const handleDelete = () => {
        onDelete?.(comment.id)
        setShowDeleteDialog(false)
    }

    const handleReply = (content: string) => {
        onReply?.(comment.id, content)
        setIsReplying(false)
    }

    return (
        <div className="group">
            <div className=" border-[1.3px] dark:border-gray-800 rounded-lg p-4 transition-colors duration-200 hover:bg-muted/50">
                <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                        <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium text-sm">
                            {comment.attributes.user?.attributes?.name?.[0] || "A"}
                        </div>
                    </div>
                    <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-foreground">
                                {comment.attributes.user?.attributes?.name || "Anonymous"}
                            </p>
                            <div className="flex items-center space-x-2">
                                <span className="text-xs text-muted-foreground">
                                    {comment.attributes.created_at}
                                </span>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-40">
                                        <DropdownMenuItem onClick={() => setIsEditing(true)}>
                                            <Edit2 className="mr-2 h-4 w-4" />
                                            Edit
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => setShowDeleteDialog(true)} className="text-destructive">
                                            <Trash2 className="mr-2 h-4 w-4" />
                                            Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                        {isEditing ? (
                            <div className="mt-2">
                                <CommentInput
                                    onSubmit={handleEdit}
                                    initialValue={comment.attributes.body}
                                    buttonText="Save"
                                    isEditing
                                />
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setIsEditing(false)}
                                    className="mt-2 text-muted-foreground hover:text-foreground"
                                >
                                    <X className="h-4 w-4 mr-2" />
                                    Cancel
                                </Button>
                            </div>
                        ) : (
                            <>
                                <p className="mt-1 text-sm text-foreground">{comment.attributes.body}</p>
                                <div className="mt-2 flex items-center space-x-4">
                                    <button
                                        onClick={handleLike}
                                        className={`flex items-center space-x-1 text-sm transition-colors duration-200 ${isLiked ? "text-primary" : "text-muted-foreground hover:text-primary"
                                            }`}
                                    >
                                        <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
                                        <span>{likesCount}</span>
                                    </button>
                                    <button
                                        onClick={() => setIsReplying(!isReplying)}
                                        className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                                    >
                                        <MessageCircle className="h-4 w-4" />
                                        <span>Reply</span>
                                    </button>
                                </div>
                            </>
                        )}
                        {isReplying && (
                            <div className="mt-4">
                                <CommentInput onSubmit={handleReply} placeholder="Write a reply..." buttonText="Reply" />
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setIsReplying(false)}
                                    className="mt-2 text-muted-foreground hover:text-foreground"
                                >
                                    <X className="h-4 w-4 mr-2" />
                                    Cancel
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Comment</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete this comment? This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {comment.attributes.replies && comment.attributes.replies.length > 0 && (
                <div className="mt-2 pl-8">
                    <button
                        onClick={toggleReplies}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                    >
                        {isExpanded ? "Hide" : "Show"} {comment.attributes.replies.length} replies
                    </button>
                    {isExpanded && (
                        <div className="mt-2 space-y-4">
                            {comment.attributes.replies.map((reply) => (
                                <Comment key={reply.id} comment={reply} onDelete={onDelete} onEdit={onEdit} onReply={onReply} />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

