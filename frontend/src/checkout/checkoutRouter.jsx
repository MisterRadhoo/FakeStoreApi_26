import { lazy, Suspense } from "react";
import ProtectedRoutes from "../auth/ProtectedRoutes.jsx";

const CheckoutPage = lazy(() => import("./CheckoutPage.jsx"));

const pageLoader = (
    <div className="pixel-font flex min-h-[50vh] items-center justify-center text-sm">
        PLEASE WAIT TO LOAD CHECKOUT...
    </div>
);

const checkoutRouter = [
    {
        path: "checkout",
        element: (
            <ProtectedRoutes>
                <Suspense fallback={pageLoader}>
                    <CheckoutPage />
                </Suspense>
            </ProtectedRoutes>
        )
    }
];

export default checkoutRouter;