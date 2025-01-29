export interface PostCollection {
  data: PostData[];
  meta: MetaData;
}

// Interface for a single post
export interface PostData {
  type : string;
  id: number;
  attributes: PostAttributes;
  relationships: {
    author: AuthorRelationship;
    likes: LikeRelationship;
    comments: CommentRelationship;
  };
  includes: {
    author: UserData;
    comments?: CommentData[];
  };
  links: {
    self: string;
  };
}

export interface PostAttributes {
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

//for collection of comments

export interface CommentCollection {
  data: CommentData[];
  meta: MetaData;
}

export interface MetaData {
  total_comments: number;
  current_page: number;
  per_page: number;
  total_pages: number;
}

// Interface for a single comment
export interface CommentData {
    type: string;
    id: number;
  attributes: CommentAttributes,
  relationships: {
    likes: LikeRelationship
  }
}
export interface CommentAttributes {
      id: number;
      body: string;
      user: {
        id: number;
        name: string;
        profile_photo_path: string | null;
      }
      created_at: string;
      updated_at: string;
      replies: CommentData[];
    };

export interface CommentPayload {
  data: {
    attributes: {
      body: string;
      base_id?: number;
      parent_id?: number;
    }
  }
}

export interface LikeRelationship {
   data: {
      type: string;
      attributes: {
        count: number;
        liked: boolean;
     };
   };
}

export interface CommentRelationship {
  data: {
    type: string;
    attributes: {
      count: number;
    };
  };
};
    
export interface AuthorRelationship {
    data: {
        type: string;
        id: number
  };
  links: {
    self: string;
  };
};

export interface UserData {
  type : string;
  id: number;
  attributes: {
    name: string;
    email: string;
    role?: string;
    profile_photo_path: string | null;
    emailVerified_at?: string;
    created_at?: string;
    updated_at?: string;
  };
  includes?: {
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