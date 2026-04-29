import { createContext, useContext, useState } from "react";
import { getProducts } from "./productsApi.js";


const ProductContext = createContext(null);

const defaultFilters = {
    keyword: "",
    sortedBy: "-createdAt",
    fields: "title,price,currency,imageCover,ratingsAverage,stock,sold",
    page: 1,
    limit: 7,
    minPrice: "",
    maxPrice: "",
    minRating: "",
};

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [paginationResult, setPaginationResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState(defaultFilters);

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
        } catch {
            setProducts([]);
            setPaginationResult(null);
        } finally {
            setLoading(false);
        }
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
        setFilters(defaultFilters);
        await fetchProducts(defaultFilters);
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
                paginationResult,
                loading,
                filters,
                updateFilters,
                fetchProducts,
                applyFilters,
                resetFilters,
                changePage,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};

export const useProducts = () => {
    const context = useContext(ProductContext);

    if (!context) {
        throw new Error("useProducts must be used inside ProductProvider!");
    }

    return context;
};