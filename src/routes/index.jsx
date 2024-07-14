import ErrorPage from "../error-page";
import HomePage from "./home";
import Layout from "./layout";
import OrderBooking from "./OrderBooking";
import OrderSummary from "./OrderSummary";
import Analysis from "./Analysis";

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
                path: "/order-booking",
                element: <OrderBooking />
            },
            {
                path: "/order-booking/summary",
                element: <OrderSummary />
            },
            {
                path: "/analysis",
                element: <Analysis />
            }
        ]
    },

];

export default routes;