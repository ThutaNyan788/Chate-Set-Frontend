import App from "@/App";
import SocialiteCallback from "@/components/auth/SocialiteCallback";
import Home from "@/pages/Home";
import Posts from "@/pages/Posts";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home/>
            },
            {
                path: "/about",
                element: <h1>About</h1>
            },
            {
                path: "/socialite-callback/:userId",
                element: <SocialiteCallback/>
            },
            {
                path: "/posts",
                element: (<><Posts /></>),
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