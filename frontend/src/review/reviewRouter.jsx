import { lazy, Suspense } from "react";
import ProtectedRoutes from "../auth/ProtectedRoutes.jsx";

const AllProductReviewsPage = lazy(() => import("./pages/AllProductReviewsPage.jsx"));

const pageLoader = (
    <div className="pixel-font flex min-h-[50vh] items-center justify-center text-sm">
        PLEASE WAIT TO LOAD REVIEWS...
    </div>
);

const reviewsRouter = [
    {
        path: "reviews",
        element: (
            <ProtectedRoutes allowedTo={["admin", "user"]}>
                <Suspense fallback={pageLoader}>
                    <AllProductReviewsPage />
                </Suspense>
            </ProtectedRoutes>
        )
    }
];

export default reviewsRouter;