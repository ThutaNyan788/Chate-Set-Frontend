import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ThumbsUp, Reply } from 'lucide-react'
import { Comment } from '@/components/comment/mockData'

interface CommentsProps {
  comments: Comment[]
}

export default function Comments({ comments }: CommentsProps) {
  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  )
}

function CommentItem({ comment }: { comment: Comment }) {
  const [likes, setLikes] = useState(comment.likes)
  const [showReplyInput, setShowReplyInput] = useState(false)
  const [replyContent, setReplyContent] = useState('')

  const handleLike = () => {
    setLikes(likes + 1)
  }

  const handleReply = () => {
    setShowReplyInput(!showReplyInput)
  }

  const submitReply = () => {
    if (replyContent.trim()) {
      // In a real app, you would send this to your backend
      console.log('Reply submitted:', replyContent)
      setReplyContent('')
      setShowReplyInput(false)
    }
  }

  return (
    <div className="border rounded-lg p-4 space-y-3">
      <div className="flex justify-between items-start">
        <div>
          <div className="font-semibold">{comment.author}</div>
          <div className="mt-1">{comment.content}</div>
        </div>
        <div className="flex space-x-2">
          <Button variant="ghost" size="sm" onClick={handleLike}>
            <ThumbsUp className="h-4 w-4 mr-2" />
            {likes}
          </Button>
          <Button variant="ghost" size="sm" onClick={handleReply}>
            <Reply className="h-4 w-4 mr-2" />
            Reply
          </Button>
        </div>
      </div>
      {showReplyInput && (
        <div className="space-y-2 mt-2">
          <Textarea 
            placeholder="Write a reply..." 
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            className="w-full"
          />
          <div className="flex justify-end space-x-2">
            <Button variant="outline" size="sm" onClick={() => setShowReplyInput(false)}>Cancel</Button>
            <Button size="sm" onClick={submitReply}>Submit Reply</Button>
          </div>
        </div>
      )}
      {comment.replies.length > 0 && (
        <div className="ml-6 mt-3 space-y-3">
          {comment.replies.map((reply) => (
            <div key={reply.id} className="border-l-2 pl-4 py-2">
              <div className="font-semibold">{reply.author}</div>
              <div className="mt-1">{reply.content}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

