import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "@/utils/axios";
import { PostCollection } from "@/models/Models";

const fetchPosts = async ({ pageParam = 1 }: { pageParam?: number }): Promise<PostCollection> => {
  const response = await axios.get<PostCollection>("/posts", {
    params: { page: pageParam, per_page: 10 }, // Adjust `per_page` as needed
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

export const useInfinitePosts = () => {
  return useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam }) => fetchPosts({ pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { current_page, total_pages } = lastPage.meta;
      return current_page < total_pages ? current_page + 1 : undefined;
    },
  });
};
