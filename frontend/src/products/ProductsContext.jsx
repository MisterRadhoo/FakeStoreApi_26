import { createContext, useContext, useState } from "react";
import {
    getProducts,
    getProductById,
    getProductBySlug,
    getRelatedProducts,
    getProductsByCategory,
    createProduct,
    updateProduct,
    deleteProduct
} from "./productsApi.js";

const ProductContext = createContext(null);

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [categoryProducts, setCategoryProducts] = useState([]);

    const [paginationResult, setPaginationResult] = useState(null);
    const [categoryPaginationResult, setCategoryPaginationResult] = useState(null);
    const [relatedPaginationResult, setRelatedPaginationResult] = useState(null);

    const [loading, setLoading] = useState(false);

    const [filters, setFilters] = useState({
        keyword: "",
        sortedBy: "-createdAt",
        fields: "",
        page: 1,
        limit: 7,
        minPrice: "",
        maxPrice: "",
        minRating: "",
    });

    const updateFilters = (values) => {
        setFilters((currentFilters) => ({
            ...currentFilters,
            ...values,
        }));
    };

    const fetchProducts = async (customFilters) => {
        setLoading(true);

        const finalFilters = customFilters || filters;

        try {
            const response = await getProducts(finalFilters);
            setProducts(response.data || []);
            setPaginationResult(response.paginationResult || null);
        } catch (error) {
            setProducts([]);
            setPaginationResult(null);
        } finally {
            setLoading(false);
        }
    };

    const fetchProductById = async (productId) => {
        setLoading(true);

        const response = await getProductById(productId);

        setProduct(response.data);

        setLoading(false);
    };

    const fetchProductBySlug = async (slug) => {
        setLoading(true);

        const response = await getProductBySlug(slug);

        setProduct(response.data);

        setLoading(false);
    };

    const fetchRelatedProducts = async ({ productId, page, limit }) => {
        setLoading(true);

        const response = await getRelatedProducts({
            productId,
            page,
            limit,
        });

        setRelatedProducts(response.data);
        setRelatedPaginationResult(response.paginationResult);

        setLoading(false);
    };

    const fetchProductsByCategory = async ({ categoryId, page, limit }) => {
        setLoading(true);

        const response = await getProductsByCategory({
            categoryId,
            page,
            limit,
        });

        setCategoryProducts(response.data);
        setCategoryPaginationResult(response.paginationResult);

        setLoading(false);
    };

    const addProduct = async (productData) => {
        const response = await createProduct(productData);

        await fetchProducts();

        return response;
    };

    const editProduct = async ({ productId, productData }) => {
        const response = await updateProduct({
            productId,
            productData,
        });

        await fetchProducts();

        return response;
    };

    const removeProduct = async (productId) => {
        const response = await deleteProduct(productId);

        await fetchProducts();

        return response;
    };

    const applyFilters = async () => {
        const nextFilters = {
            ...filters,
            page: 1,
        };

        setFilters(nextFilters);
        await fetchProducts(nextFilters);
    };

    const resetFilters = async () => {
        const resetedFilters = {
            keyword: "",
            sortedBy: "-createdAt",
            fields: "",
            page: 1,
            limit: 7,
            minPrice: "",
            maxPrice: "",
            minRating: "",
        };

        setFilters(resetedFilters);
        await fetchProducts(resetedFilters);
    };

    const changePage = async (page) => {
        const nextFilters = {
            ...filters,
            page,
        };

        setFilters(nextFilters);
        await fetchProducts(nextFilters);
    };

    return (
        <ProductContext.Provider
            value={{
                products,
                product,
                relatedProducts,
                categoryProducts,

                paginationResult,
                categoryPaginationResult,
                relatedPaginationResult,

                loading,

                filters,
                updateFilters,
                applyFilters,
                resetFilters,
                changePage,

                fetchProducts,
                fetchProductById,
                fetchProductBySlug,
                fetchRelatedProducts,
                fetchProductsByCategory,

                addProduct,
                editProduct,
                removeProduct,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};

export const useProducts = () => {
    return useContext(ProductContext);
}