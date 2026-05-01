import { lazy, Suspense } from "react";

//import CategoriesPage from "./pages/CategoriesPage.jsx";
//import CategoryDetailsPage from "./pages/CategoryDetailsPage.jsx";

const CategoriesPage = lazy(() => import("./pages/CategoriesPage.jsx"));
const CategoryDetailsPage = lazy(() => import("./pages/CategoryDetailsPage.jsx"));

const pageLoader = (
    <div className="pixel-font flex min-h-[50vh] items-center justify-center text-sm">
        CATEGORY IS LOADING...
    </div>
);

const categoryRouter = [
    {
        path: "categories",
        element: (
            <Suspense fallback={pageLoader}>
                <CategoriesPage />
            </Suspense>
        )
    },
    {
        path: "categories/:categoryId",
        element: <Suspense fallback={pageLoader}>
            <CategoryDetailsPage />
        </Suspense>
    }
];

export default categoryRouter;