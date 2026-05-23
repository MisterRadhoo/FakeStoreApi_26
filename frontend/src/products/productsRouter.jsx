import { lazy, Suspense } from "react";
import ProtectedRoutes from "../auth/ProtectedRoutes.jsx";

const ProductPage = lazy(() => import("./pages/ProductsPage.jsx"));
const ProductDetailsPage = lazy(() => import("./pages/ProductDetailsPage.jsx"));
const CreateProductPage = lazy(() => import("./pages/CreateProductPage.jsx"));

const pageLoader = (
    <div className="pixel-font flex min-h-[50vh] items-center justify-center text-sm">
        PLEASE WAIT TO LOAD PRODUCTS...
    </div>
);

const ProductsRouter = [
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
    },
    {
        path: "products/create",
        element: (
            <ProtectedRoutes allowedTo={["admin"]}>
                <Suspense fallback={pageLoader}>
                    <CreateProductPage />
                </Suspense>
            </ProtectedRoutes>
        )
    }
];

export default ProductsRouter;