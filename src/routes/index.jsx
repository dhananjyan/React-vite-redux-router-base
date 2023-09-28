import ErrorPage from "../error-page";
import HomePage from "./home";
import Layout from "./layout";

const routes = [
    {
        path: "/",
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <HomePage />
            },
            {
                path: "/contacts/:id",
                element: <div>Contact</div>
            }
        ]
    },

];

export default routes;