// Interface for a single post
export interface PostData {
  type : string;
  id: number;
  attributes: {
    title: string;
    slug: string;
    img_url: string;
    tags: [];
    content: string;
    read_time: number;
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
  };
  includes: {
    author: UserData;
  };
  links: {
    self: string;
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