export interface Comment {
    id: number;
    author: string;
    content: string;
    likes: number;
    replies: Reply[];
  }
  
  export interface Reply {
    id: number;
    author: string;
    content: string;
  }
  
  export const mockComments: Comment[] = [
    {
      id: 1,
      author: "John Doe",
      content: "This is a great post!",
      likes: 5,
      replies: [
        {
          id: 101,
          author: "Jane Smith",
          content: "I agree, very informative!",
        },
      ],
    },
    {
      id: 2,
      author: "Alice Johnson",
      content: "Thanks for sharing this.",
      likes: 3,
      replies: [],
    },
  ];
  
  