import { useEffect, useState } from "react";
import { getCategoryById, getProductsByCategory } from "../categoryApi.js";

const useCategoryDetails = (categoryId) => {
    const [category, setCategory] = useState(null);
    const [products, setProducts] = useState([]);
    const [productsCount, setProductsCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    const getErrorMessage = (error, fallbackMessage) => {
        if (
            error &&
            error.response &&
            error.response.data &&
            error.response.data.message
        ) {
            return error.response.data.message;
        }

        return fallbackMessage;
    };

    const loadCategoryDetails = async () => {
        if (!categoryId) {
            setCategory(null);
            setProducts([]);
            setProductsCount(0);
            setErrorMessage("");
            setLoading(false);
            return;
        }

        setLoading(true);
        setErrorMessage("");

        try {
            const [categoryResponse, productsResponse] = await Promise.all([
                getCategoryById(categoryId),
                getProductsByCategory({
                    categoryId,
                    page: 1,
                    limit: 35,
                    sort: "-createdAt",
                }),
            ]);

            const categoryProducts =
                productsResponse && Array.isArray(productsResponse.products)
                    ? productsResponse.products
                    : [];

            setCategory(categoryResponse.data || null);
            setProducts(categoryProducts);
            setProductsCount(
                productsResponse && typeof productsResponse.count === "number"
                    ? productsResponse.count
                    : categoryProducts.length
            );
        } catch (error) {
            setErrorMessage(
                getErrorMessage(error, "Category details could not be loaded.")
            );

            setCategory(null);
            setProducts([]);
            setProductsCount(0);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCategoryDetails();
    }, [categoryId]);

    return {
        category,
        products,
        productsCount,
        loading,
        errorMessage,
        reloadCategoryDetails: loadCategoryDetails,
    };
};

export default useCategoryDetails;