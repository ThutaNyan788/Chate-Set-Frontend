
import { Button } from "@/components/ui/button"
import { usePostDetail } from "@/hooks/usePostDetail";
import { useParams } from "react-router-dom";
import PostContent from "./PostContent";
import CommentSection from "../comment/CommentSection";
import { useCommentData } from "@/hooks/useCommentsData";
import { useLikeMutation } from "@/hooks/useLikeMutation";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "@/utils/axios";
import { CommentCollection } from "@/models/Models";

export default function PostDetail() {


  const { slug } = useParams<{ slug: string }>();

  // Fetch post data
  const { data: post, error, isLoading } = usePostDetail(slug || "");

  const { mutate: toggleLike, error: likeError } = useLikeMutation("post", ["post", post?.attributes.slug]);

  const handleLikeToggle = async (id: number) => {
    toggleLike(id);
  };

  // Conditionally fetch comments only if post exists
  // const { data: comments, isLoading: isCommentLoading } = useCommentData(
  //   'posts',
  //   post?.id ? post.id : null, {
  //   enabled: !!post?.id,
  // }
  // );

  //infinite comments
  const field = 'posts';
  const current = post;
  const fetchComments = async ({
    queryKey,
    pageParam = 1,
  }: {
    queryKey: [string, number | null, string];
    pageParam?: number;
  }): Promise<CommentCollection> => {
    const [, id] = queryKey; // Ignore `field` (already known)

    if (!id) throw new Error("ID is required to fetch comments");

    const response = await axios.get<CommentCollection>(
      `/comments/${field}/${id}`,
      {
        params: { page: pageParam, per_page: 10 }, // Adjust `per_page` if needed
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    return response.data;
  };

  const {
    data: infinite_comments,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isCommentsLoading,
  } = useInfiniteQuery({
    queryKey: [field, current?.id, 'comments'],
    queryFn: ({ queryKey, pageParam }) => fetchComments({ queryKey: queryKey as [string, number | null, string], pageParam }),
    enabled: !!current?.id,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { current_page, total_pages } = lastPage.meta;
      return current_page < total_pages ? current_page + 1 : undefined;
    },
  });


  return (
    <div className="max-w-3xl mx-auto md:px-8 py-8 bg-white dark:bg-transparent">
      {isLoading && <div>Loading...</div>}
      {error && <div>Error fetching post</div>}
      {post && (
        <div>
          <PostContent post={post} />
          <div className="mt-4 mb-8 flex justify-between items-center">
            <div className="flex space-x-4">
              <Button variant="outline">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                </svg>
                Like
              </Button>
              <Button variant="outline">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                </svg>
                Share
              </Button>
            </div>

          </div>
          <CommentSection
            field="posts"
            current={post}
            comments={infinite_comments}
            isCommentLoading={isCommentsLoading}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
          />
          
        </div>
      )}


    </div>
  )
}

