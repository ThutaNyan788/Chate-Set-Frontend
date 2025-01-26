"use client"

import { useState } from "react"
import { Comment } from "./Comment"
import { CommentInput } from "./CommentInput"
import { CommentData } from "@/models/Models"

interface CommentProps {
    initialComments: CommentData[];
    links: {
        self: string;
        pagination: {
            current_page: number;
            total_pages: number;
            per_page: number;
            total: number;
            next_page_url: string | null;
            prev_page_url: string | null;
        };
    };
}

const CommentSection: React.FC<CommentProps> = ({ initialComments }) => {
    console.log(initialComments);
    const [comments, setComments] = useState(initialComments)

    const handleAddComment = (content: string) => {
        const newComment: CommentData = {
            type: "comment",
            id: Date.now(),
            attributes: {
                id: Date.now(),
                body: content,
                user: {
                    type: "user",
                    id: 1,
                    attributes: {
                        name: "You",
                        email: "you@example.com",
                        profile_photo_path: '',
                    },
                    links: {
                        self: "http://127.0.0.1:8000/api/v1/authors/1",
                    },
                },
                likes_count: 0,
                is_liked: false,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                replies: [],
            },
        }
        setComments([newComment, ...comments])
    }

    const handleEdit = (id: number, newContent: string) => {
        const updateComment = (comments: CommentData[]): CommentData[] => {
            return comments.map((comment) => {
                if (comment.id === id) {
                    return {
                        ...comment,
                        attributes: {
                            ...comment.attributes,
                            body: newContent,
                            updated_at: new Date().toISOString(),
                        },
                    }
                }
                if (comment.attributes.replies.length > 0) {
                    return {
                        ...comment,
                        attributes: {
                            ...comment.attributes,
                            replies: updateComment(comment.attributes.replies),
                        },
                    }
                }
                return comment
            })
        }
        setComments(updateComment(comments))
    }

    const handleDelete = (id: number) => {
        const deleteComment = (comments: CommentData[]): CommentData[] => {
            return comments.filter((comment) => {
                if (comment.id === id) {
                    return false
                }
                if (comment.attributes.replies.length > 0) {
                    comment.attributes.replies = deleteComment(comment.attributes.replies)
                }
                return true
            })
        }
        setComments(deleteComment(comments))
    }

    const handleReply = (parentId: number, content: string) => {
        const addReply = (comments: CommentData[]): CommentData[] => {
            return comments.map((comment) => {
                if (comment.id === parentId) {
                    const newReply: CommentData = {
                        type: "comment",
                        id: Date.now(),
                        attributes: {
                            id: Date.now(),
                            body: content,
                            user: {
                                type: "user",
                                id: 1,
                                attributes: {
                                    name: "You",
                                    email: "you@example.com",
                                    profile_photo_path: null,
                                },
                                links: {
                                    self: "http://127.0.0.1:8000/api/v1/authors/1",
                                },
                            },
                            likes_count: 0,
                            is_liked: false,
                            created_at: new Date().toISOString(),
                            updated_at: new Date().toISOString(),
                            replies: [],
                        },
                    }
                    return {
                        ...comment,
                        attributes: {
                            ...comment.attributes,
                            replies: [...comment.attributes.replies, newReply],
                        },
                    }
                }
                if (comment.attributes.replies.length > 0) {
                    return {
                        ...comment,
                        attributes: {
                            ...comment.attributes,
                            replies: addReply(comment.attributes.replies),
                        },
                    }
                }
                return comment
            })
        }
        setComments(addReply(comments))
    }

    return (
        <div className="space-y-6 max-w-3xl mx-auto">
            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-primary">Discussion ({comments?.length || '0'})</h2>
                <CommentInput onSubmit={handleAddComment} />
            </div>
            <div className="space-y-4">
                {comments?.map((comment) => (
                    <Comment
                        key={comment.id}
                        comment={comment}
                        onDelete={handleDelete}
                        onEdit={handleEdit}
                        onReply={handleReply}
                    />
                ))}
            </div>
        </div>
    )
}

export default CommentSection

