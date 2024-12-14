import App from "@/App";
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
                path: "/posts",
                element: <Posts/>
            },
            {
                path: "/about",
                element: <h1>About</h1>
            },
            {
                path: "/socialite-callback/:userId",
                element: <h2>hello</h2>
            }
        ]
    },
]);


const Router = () => {
    return (
        <RouterProvider router={router} />
    )
}

export default Router;