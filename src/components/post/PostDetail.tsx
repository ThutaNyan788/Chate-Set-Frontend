
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import TestImage from "@/assets/javascript.png"

export default function PostDetail() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">The Future of Web Development: A Deep Dive into Next.js</h1>
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Author" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">John Doe</p>
            <p className="text-sm text-gray-500">Published on May 15, 2023 · 10 min read</p>
          </div>
        </div>
      </header>

      <img
        src={TestImage}
        alt="Blog post cover image"
        className="w-full h-[300]  rounded-lg mb-8 "
      />

      <article className="text-lg leading-relaxed space-y-6">
        <p>
          Next.js has been making waves in the web development community, and for good reason.
          As we look towards the future of web development, it's clear that frameworks like Next.js
          will play a crucial role in shaping how we build and deploy web applications.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">The Rise of Server-Side Rendering</h2>
        <p>
          One of the key features that sets Next.js apart is its robust support for server-side
          rendering (SSR). This approach offers significant benefits in terms of performance and SEO,
          making it an attractive option for developers looking to build fast, search-engine-friendly
          applications.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Static Site Generation: The Best of Both Worlds</h2>
        <p>
          Next.js also excels in static site generation (SSG), allowing developers to create
          lightning-fast websites that can be easily deployed to content delivery networks. This
          hybrid approach combines the benefits of static sites with the dynamic capabilities of
          server-side rendering, offering a flexible solution for a wide range of projects.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">The Future is Bright</h2>
        <p>
          As we continue to push the boundaries of what's possible on the web, frameworks like
          Next.js will undoubtedly play a central role in shaping the future of web development.
          With its powerful features and growing ecosystem, Next.js is well-positioned to become
          the go-to choice for developers looking to build modern, performant web applications.
        </p>
      </article>


      <div className="mt-8 flex justify-between items-center">
        <div className="flex space-x-4">
          <Button variant="outline">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
            </svg>
            Like
          </Button>
          <Button variant="outline">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
            </svg>
            Share
          </Button>
        </div>
        <Button>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
          </svg>
          Save
        </Button>
      </div>
    </div>
  )
}

