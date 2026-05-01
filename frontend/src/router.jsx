import { createBrowserRouter } from "react-router-dom";

import AppLayout from "./AppLayout.jsx";
import homeRouter from "./routers/homeRouter.jsx";
import authRouter from "./auth/AuthRouter.jsx";
import accountRouter from "./routers/accountRouter.jsx";
import productsRouter from "./products/productsRouter.jsx";
import categoryRouter from "./category/categoryRouter.jsx";
import NotFound from "./components/NotFound.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: < AppLayout />,
        errorElement: <NotFound />,
        children: [
            ...homeRouter,
            ...authRouter,
            ...accountRouter,
            ...productsRouter,
            ...categoryRouter,
            {
                path: "*",
                element: <NotFound />
            },

        ]
    }
]);



export default router;