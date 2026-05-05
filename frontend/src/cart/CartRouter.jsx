import { lazy, Suspense } from "react";
import ProtectedRoutes from "../auth/ProtectedRoutes.jsx";

const CartPage = lazy(() => import("./pages/CartPage.jsx"));

const pageLoader = (
    <div className="pixel-font flex min-h-[50vh] items-center justify-center text-sm">
        PLEASE WAIT TO LOAD CART...
    </div>
);

const cartRouter = [
    {
        path: "cart",
        element: (
            <ProtectedRoutes>
                <Suspense fallback={pageLoader}>
                    <CartPage />
                </Suspense>
            </ProtectedRoutes>
        )
    },
];

export default cartRouter;