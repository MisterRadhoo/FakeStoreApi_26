import { createBrowserRouter } from "react-router-dom";

import AppLayout from "./AppLayout.jsx";
import homeRouter from "./routers/homeRouter.jsx";
import authRouter from "./auth/authRouter.jsx";
import accountRouter from "./routers/accountRouter.jsx";
import productsRouter from "./products/productsRouter.jsx";
import categoryRouter from "./category/categoryRouter.jsx";
import cartRouter from "./cart/cartRouter.jsx";
import checkoutRouter from "./checkout/checkoutRouter.jsx";
import taxRatesRouter from "./taxRates/taxRatesRouter.jsx";
import reviewsRouter from "./review/reviewRouter.jsx";
import blackListRouter from "./blacklist/blackListRouter.jsx";
import NotFound from "./components/NotFound.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        errorElement: <NotFound />,
        children: [
            ...homeRouter,
            ...authRouter,
            ...accountRouter,
            ...productsRouter,
            ...categoryRouter,
            ...cartRouter,
            ...checkoutRouter,
            ...taxRatesRouter,
            ...reviewsRouter,
            ...blackListRouter,
            {
                path: "*",
                element: <NotFound />
            },

        ]
    }
]);



export default router;