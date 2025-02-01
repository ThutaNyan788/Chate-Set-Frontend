"use client"

import { useEffect, useState } from "react"
import { Comment } from "./Comment"
import { CommentInput } from "./CommentInput"
import { CommentCollection, CommentData, CommentPayload } from "@/models/Models"
import { useCommentMutation } from "@/hooks/useCommentMutation"
import { useQueryClient } from "@tanstack/react-query";
import { useLikeMutation } from "@/hooks/useLikeMutation"


interface CurrentData {
    id: number;
    relationships: {
        comments_count: number;
    }
    // add other properties if needed
}

interface CommentProps {
    field: string;
    current: CurrentData;
    comments: CommentCollection;
    isCommentLoading?: boolean;

}

const CommentSection: React.FC<CommentProps> = ({ comments, field, current, isCommentLoading }) => {

    const { mutate: addComment, isLoading } = useCommentMutation(field, current.id);

    const { mutate: toggleLike, error: likeError } = useLikeMutation("comments", ["posts", current.id, "comments"]);

    const handleLikeToggle = async (id: number) => {
        toggleLike(id);
    };

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
                {isCommentLoading && (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-primary">
                            <div className="animate-pulse rounded-md bg-gray-200 h-4 w-48"></div>
                        </h2>

                        {[1,2,3,4,5,6].map((comment) => (
                            <div className="animate-pulse rounded-md bg-gray-200 h-28 w-full"></div>
                        ))}
                    </div>
                )}
                {!isCommentLoading &&
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-primary">Discussion ({comments?.meta.total_comments || '0'})</h2>

                        {comments && comments?.data.map((comment) => (
                            <Comment
                                key={comment.id}
                                comment={comment}
                                onLikeToggle={() => handleLikeToggle(comment.id)}
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

