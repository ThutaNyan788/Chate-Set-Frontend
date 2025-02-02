"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Send } from "lucide-react"

interface CommentInputProps {
    onSubmit: (content: string) => void
    placeholder?: string
    buttonText?: string
    initialValue?: string
    isEditing?: boolean
}

export function CommentInput({
    onSubmit,
    placeholder = "Write a comment...",
    buttonText = "Comment",
    initialValue = "",
    isEditing = false,
}: CommentInputProps) {
    const [content, setContent] = useState(initialValue)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (content.trim()) {
            onSubmit(content)
            if (!isEditing) {
                setContent("")
            }
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={placeholder}
                className="min-h-[100px] resize-none"
            />
            <div className="flex justify-end">
                <Button
                    type="submit"
                    disabled={!content.trim()}
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                    <Send className="w-4 h-4 mr-2" />
                    {buttonText}
                </Button>
            </div>
        </form>
    )
}

