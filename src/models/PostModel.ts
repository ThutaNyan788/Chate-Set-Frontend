// Interface for a single post
export interface PostData {
  id: number;
  attributes: {
    title: string;
    slug: string;
    tags: [];
    content: string;
    schedule_date: string;
    created_at: string;
    updated_at: string;
  };
}

// Generic interface for API response
export interface ApiResponse<T> {
  data: T;
}