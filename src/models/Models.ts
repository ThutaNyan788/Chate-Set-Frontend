// Interface for a single post
export interface PostData {
  type : string;
  id: number;
  attributes: {
    category: string;
    title: string;
    slug: string;
    thumbnail: string;
    tags: [];
    content: string;
    read_time: number;
    is_bookmarked: boolean;
    schedule_date: string;
    created_at: string;
    updated_at: string;
  };
  relationships: {
      author: {
        data: {
            type: string;
            id: number
      };
      links: {
        self: string;
      };
    };
    likes: {
      'likes_count': number;
      'is_liked': boolean;
    };
    comments: {
      data: CommentData[];
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
  };
  includes: {
    author: UserData;
  };
  links: {
    self: string;
  };
}


// Interface for a single comment
export interface CommentData {
  type: string;
  id: number;
  attributes: {
    id: number;
    body: string;
    user: UserData;
    likes_count: number;
    is_liked: boolean;
    created_at: string;
    updated_at: string;
    replies: CommentData[];
  };
}

export interface UserData {
  type : string;
  id: number;
  attributes: {
    name: string;
    email: string;
    role: string;
    profile_photo_path: string;
    emailVerified_at: string;
    created_at: string;
    updated_at: string;
  };
  includes: {
    post: PostData;
  };
  links: {
    self: string;
  };
}

// Generic interface for API response
export interface ApiResponse<T> {
  data: T;
}