import React from 'react'
import { PostData } from '@/models/PostModel';

interface PostProps {
  post: PostData;
}

const Post: React.FC<PostProps> = ({post}) => {
  return (
    <div>{ post.attributes.title }</div>
  )
}

export default Post