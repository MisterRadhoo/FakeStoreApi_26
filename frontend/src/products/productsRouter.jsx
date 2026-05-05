import { lazy, Suspense } from "react";
import ProtectedRoutes from "../auth/ProtectedRoutes.jsx";

const ProductPage = lazy(() => import("../pages/ProductsPage.jsx"));
const ProductDetailsPage = lazy(() => import("./pages/ProductDetailsPage.jsx"));
const CreateProductForm = lazy(() => import("./components/CreateProductForm.jsx"));

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
    },
    {
        path: "products/create",
        element: (
            <ProtectedRoutes>
                <Suspense fallback={pageLoader}>
                    <CreateProductForm />
                </Suspense>
            </ProtectedRoutes>
        )
    }
];

export default productsRouter;