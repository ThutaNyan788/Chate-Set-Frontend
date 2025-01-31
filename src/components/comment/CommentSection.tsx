"use client"

import { Comment } from "./Comment"
import { CommentInput } from "./CommentInput"
import { CommentCollection, CommentData, CommentPayload } from "@/models/Models"
import { useCommentMutation } from "@/hooks/useCommentMutation"
import { InfiniteData } from "@tanstack/react-query";
import { useLikeMutation } from "@/hooks/useLikeMutation"
import { useInView } from "react-intersection-observer";
import { useEffect } from "react"


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
    comments: InfiniteData<CommentCollection> | undefined;
    isCommentLoading?: boolean;
    fetchNextPage: () => void;
    hasNextPage?: boolean;
    isFetchingNextPage?: boolean;

}

const CommentSection: React.FC<CommentProps> = ({
    comments,
    field,
    current,
    isCommentLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
}) => {

    const { ref, inView, entry } = useInView();

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    },[inView, hasNextPage]);

    const allComments = comments?.pages.flatMap((page) => page.data) || [];
    const totalComments = comments?.pages[0]?.meta.total_comments || 0;

    const { mutate: addComment } = useCommentMutation(field, current.id);

    const { mutate: toggleLike } = useLikeMutation("comments", ["posts", current.id, "comments"]);

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
                    const newReply: CommentData = {

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
            <div>
                <div className="space-y-4 mb-4">
                    <CommentInput onSubmit={handleAddComment} />
                </div>
                {isCommentLoading && <div>Loading comments...</div>}
                {!isCommentLoading &&
                    <div>
                        <h2 className="text-2xl font-bold text-primary mb-4">Discussion ({totalComments})</h2>
                        <div className="space-y-4 max-h-[65vh] overflow-y-scroll">
                            {isCommentLoading ? (
                                <p>Loading comments...</p>
                            ) : allComments.length > 0 ? (
                                allComments.map((comment,index) => (
                                    allComments.length === index + 1 ? (
                                        <Comment
                                            innerRef={ref}
                                            key={comment.id}
                                            comment={comment}
                                            onLikeToggle={() => handleLikeToggle(comment.id)}
                                            onDelete={handleDelete}
                                            onEdit={handleEdit}
                                            onReply={handleReply}
                                        />
                                    ) : (
                                            <Comment
                                                key={comment.id}
                                                comment={comment}
                                                onLikeToggle={() => handleLikeToggle(comment.id)}
                                                onDelete={handleDelete}
                                                onEdit={handleEdit}
                                                onReply={handleReply}
                                            />
                                    )
                            
                                ))
                            ) : (
                                <p className="text-gray-500">No comments yet.</p>
                            )}

                            {isFetchingNextPage ? "Loading..." : ""}
                                
                        </div>
                    </div>
                }
            </div>



        </div>
    )
}

export default CommentSection

