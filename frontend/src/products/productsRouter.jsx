import { lazy, Suspense } from "react";
// import ProductPage from "../pages/ProductsPage.jsx";
// import ProductDetailsPage from "./pages/ProductDetailsPage.jsx";


const ProductPage = lazy(() => import("../pages/ProductsPage.jsx"));
const ProductDetailsPage = lazy(() => import("./pages/ProductDetailsPage.jsx"));

const pageLoader = (
    <div className="pixel-font flex min-h-[50vh] items-center justify-center text-sm">
        PLEASE WAIT TO LOAD PRODUCTS...
    </div>
);

const productsRouter = [
    {
        path: "products",
        element: (<Suspense fallback={pageLoader}>
            <ProductPage />
        </Suspense>)
    },
    {
        path: "products/:productId",
        element: (
            <Suspense fallback={pageLoader}>
                <ProductDetailsPage />
            </Suspense>
        )
    }
];

export default productsRouter;