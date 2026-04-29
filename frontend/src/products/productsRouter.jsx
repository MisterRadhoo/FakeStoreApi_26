import ProductPage from "../pages/ProductsPage.jsx";
import ProductDetailsPage from "./pages/ProductDetailsPage.jsx";

const productsRouter = [
    {
        path: "products",
        element: <ProductPage />
    },
    {
        path: "products/:productId",
        element: <ProductDetailsPage />
    }
];

export default productsRouter;