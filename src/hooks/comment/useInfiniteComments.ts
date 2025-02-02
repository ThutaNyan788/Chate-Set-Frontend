import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "@/utils/axios";
import { CommentCollection } from "@/models/Models";

const fetchComments = async ({
  field,
  id,
  pageParam = 1,
}: {
  field: string;
  id: number;
  pageParam?: number;
}): Promise<CommentCollection> => {
  if (!id) throw new Error("ID is required to fetch comments");

  const response = await axios.get<CommentCollection>(`/comments/${field}/${id}`, {
    params: { page: pageParam, per_page: 10 }, // Adjust `per_page` if needed
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return response.data;
};

export const useInfiniteComments = (field: string, id?: number) => {
  return useInfiniteQuery({
    queryKey: [field, id, "comments"],
    queryFn: ({ pageParam }) => fetchComments({ field, id: id as number, pageParam }),
    enabled: !!id,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { current_page, total_pages } = lastPage.meta;
      return current_page < total_pages ? current_page + 1 : undefined;
    },
  });
};
