import { lazy, Suspense } from "react";

const HomePage = lazy(() => import("../pages/HomePage.jsx"));

const pageLoader = (
    <div className="pixel-font flex min-h-[50vh] items-center justify-center text-sm">
        PLEASE WAIT TO LOAD HOME...
    </div>
);

const homeRouter = [
    {
        index: true,
        element: (
            <Suspense fallback={pageLoader}>
                <HomePage />
            </Suspense>
        )
    }
];

export default homeRouter;