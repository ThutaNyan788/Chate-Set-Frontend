"use client"

import { Comment } from "./components/Comment"
import { CommentInput } from "./components/CommentInput"
import { CommentCollection, CommentPayload } from "@/models/Models"
import { useStoreComment } from "@/hooks/comment/useStoreComment"
import { InfiniteData } from "@tanstack/react-query";
import { useLikeMutation } from "@/hooks/useLikeMutation"
import { useInView } from "react-intersection-observer";
import { useEffect } from "react"
import { useEditComment } from "@/hooks/comment/useEditComment"
import { useDeleteComment } from "@/hooks/comment/useDeleteComment"
import { useStoreReply } from "@/hooks/comment/useStoreReply"


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

    const { ref, inView } = useInView();

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, fetchNextPage]);

    const allComments = comments?.pages.flatMap((page) => page.data) || [];
    const totalComments = comments?.pages[0]?.meta.total_comments || 0;

    const { mutate: addComment } = useStoreComment(field, current.id);
    const { mutate: replyComment } = useStoreReply(field, current.id);
    const { mutate: editComment } = useEditComment(field, current.id);
    const { mutate: deleteComment } = useDeleteComment(field, current.id);

    const { mutate: toggleLike } = useLikeMutation("comments", ["posts", current.id, "comments"]);

    const handleLikeToggle = async (id: number) => {
        toggleLike(id);
    };

    const handleAddComment = (content: string) => {
        const payload: CommentPayload = {
            data: {
                attributes: {
                    body: content
                }
            }
        }

        addComment(payload);
    }


    const handleEdit = (commentId: number, newContent: string) => {
        const payload: CommentPayload = {
            data: {
                attributes: {
                    body: newContent
                }
            }
        }
        editComment({ commentId, payload });
    }

    const handleDelete = (id: number) => {
        deleteComment(id);
    }

    const handleReply = (payload: CommentPayload) => {
        replyComment(payload);
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

                        {[1, 2, 3, 4, 5, 6].map((index) => (
                            <div key={index} className="animate-pulse rounded-md bg-gray-200 h-28 w-full"></div>
                        ))}
                    </div>
                )}
                {!isCommentLoading &&
                    <div>
                        <h2 className="text-2xl font-bold text-primary mb-4">Discussion ({totalComments})</h2>
                        <div className="space-y-4 max-h-[65vh] overflow-y-auto">
                            {isCommentLoading ? (
                                <p>Loading comments...</p>
                            ) : allComments.length > 0 ? (
                                allComments.map((comment, index) => (

                                    <Comment
                                        innerRef={allComments.length === index + 1 ? ref : undefined}
                                        key={comment.id}
                                        comment={comment}
                                        onLikeToggle={handleLikeToggle}
                                        onDelete={handleDelete}
                                        onEdit={handleEdit}
                                        onReply={handleReply}
                                        rootCommentId={comment.id}
                                        depth={1}
                                    />

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

