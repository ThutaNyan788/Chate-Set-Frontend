import App from "@/App";
import SocialiteCallback from "@/components/auth/SocialiteCallback";
import PostDetail from "@/components/post/PostDetail";
import Explore from "@/pages/Explore";
import Home from "@/pages/Home";
import Notifications from "@/pages/Notifications";
import Posts from "@/pages/Posts";
import Library from "@/pages/Library";
import Groups from "@/pages/Groups";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import AuthenticatedLayout from "@/components/layout/AuthenticatedLayout";
import { PostCreate } from "@/pages/PostCreate";
import ProfileSetting from "@/components/profile/ProfileSetting";
import ProfileEdit from "@/pages/ProfileEdit";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/about",
                element: <h1>About</h1>
            },
            {
                path: "/socialite-callback/:userId",
                element: <SocialiteCallback />
            },
            {
                element: <AuthenticatedLayout />,
                children: [
                    {
                        path: "/posts",
                        element: <Posts />,
                    },
                    {
                        path: "posts/:slug",
                        element: <PostDetail />,
                    },
                    {
                        path: "posts/create",
                        element: <PostCreate />,
                    },
                    {
                        path: "/explore",
                        element: <Explore />
                    },
                    {
                        path: "/notifications",
                        element: <Notifications />
                    },
                    {
                        path: "/library",
                        element: <Library />
                    },
                    {
                        path: "/groups",
                        element: <Groups />
                    },
                    {
                        path: "/profile",
                        element: <ProfileSetting />,
                    },
                    {
                        path: "/profile/edit",
                        element: <ProfileEdit />
                    }

                ],
            },
            {
                path: "*",
                element: <h1>404 not found</h1>
            }
        ],
    },

]);


const Router = () => {
    return (
        <RouterProvider router={router} />
    )
}

export default Router;