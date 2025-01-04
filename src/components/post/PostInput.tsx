import * as React from "react"

import { cn } from "@/lib/utils"

const PostInput = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
    ({ className, type, ...props }, ref) => {
        return (
            <input
                type={type}
                className={cn(
                    "w-full bg-transparent border border-gray-300 dark:border-gray-800 rounded p-2 mb-2",
                    className
                )}
                ref={ref}
                {...props}
            />
        )
    }
)

PostInput.displayName = "PostInput"


export default PostInput