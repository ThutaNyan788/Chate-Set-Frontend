import App from "@/App";
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