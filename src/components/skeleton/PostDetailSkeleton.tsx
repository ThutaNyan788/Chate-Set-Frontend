

const PostDetailSkeleton = () => {
    return (
        <>
            <div className=' border-b pb-4 mb-3'>
                <header className="mb-8 ">
                    <h1 className="text-4xl font-bold mb-4">
                        <div className="animate-pulse bg-gray-200 h-8 w-full rounded-md mb-4"></div>
                    </h1>
                    <div className="flex items-center space-x-4">
                        <div className="animate-pulse bg-gray-200  h-12 w-12 rounded-full"></div>
                        <div className="space-y-2">
                            <div className="animate-pulse rounded-md bg-gray-200 h-4 w-48"></div>
                            <div className="animate-pulse rounded-md bg-gray-200 h-4 w-64"></div>
                        </div>
                    </div>
                </header>

                <div className="animate-pulse bg-gray-200 h-[300px] rounded-lg mb-8"></div>

                <article className="markdown-body">
                    <div className="animate-pulse rounded-md bg-gray-200 h-4 w-1/2 mb-4"></div>
                    <div className="animate-pulse rounded-md bg-gray-200 h-4 w-3/4 mb-4"></div>
                    <div className="animate-pulse rounded-md bg-gray-200 h-4 w-3/4 mb-4"></div>
                </article>
            </div>

            <div className="mt-4 mb-8 flex justify-between items-center">
                <div className="flex space-x-4">
                    <div >
                        <div className="animate-pulse rounded-md bg-gray-200 h-8 w-24"></div>
                    </div>
                    <div>
                        <div className="animate-pulse rounded-md bg-gray-200 h-8 w-24"></div>
                    </div>
                </div>

            </div>

            <div className="space-y-6 max-w-3xl mx-auto">
                <div>
                    <div className="space-y-4 mb-4">
                        <div className="animate-pulse rounded-md bg-gray-200 h-40 w-full"></div>

                        <div className="flex justify-end">
                            <div className="animate-pulse rounded-md bg-gray-200 h-8 w-24"></div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default PostDetailSkeleton