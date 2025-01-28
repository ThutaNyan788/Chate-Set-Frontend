"use client"

import { useEffect, useState } from "react"
import { Comment } from "./Comment"
import { CommentInput } from "./CommentInput"
import { CommentData, CommentPayload } from "@/models/Models"
import { useCommentMutation } from "@/hooks/useCommentMutation"
import {  useQueryClient } from "@tanstack/react-query";


interface CurrentData {
    id: number;
    // add other properties if needed
}

interface CommentProps {
    field: string;
    current: CurrentData;
    initialComments: CommentData[];
    isCommentLoading?: boolean;
    links?: {
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

const CommentSection: React.FC<CommentProps> = ({ initialComments, field, current, isCommentLoading }) => {

    const [comments, setComments] = useState<CommentData[]>(initialComments);

    const queryClient = useQueryClient();
    const cacheKey = [field, current.id, 'comments'];
    const cachedComments = queryClient.getQueriesData<CommentData[]>({ queryKey: cacheKey });

    // Sync state with initialComments when it changes
    useEffect(() => {
        setComments(initialComments);
    }, [initialComments,cachedComments]);

    const { mutate: addComment, isLoading } = useCommentMutation(field, current.id);

    const handleAddComment = (content: string) => {
        const commentPayload: CommentPayload = {
            data: {
                attributes: {
                    body: content
                }
            }
        }

        addComment(commentPayload);
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
                    // const newReply: CommentData = {

                    // }
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
            <div>
                <div className="space-y-4 mb-4">
                    <CommentInput onSubmit={handleAddComment} />
                </div>
                {isCommentLoading && <div>Loading comments...</div>}
                {!isCommentLoading &&
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-primary">Discussion ({comments?.length || '0'})</h2>

                        {comments && comments?.map((comment) => (
                            <Comment
                                key={comment.id}
                                comment={comment}
                                onDelete={handleDelete}
                                onEdit={handleEdit}
                                onReply={handleReply}
                            />
                        ))}
                    </div>
                }
            </div>



        </div>
    )
}

export default CommentSection

