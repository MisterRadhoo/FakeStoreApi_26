import { useEffect, useState } from "react";
import { getCategories } from "../../category/categoryApi.js";

const ProductCategoryFilter = ({
    selectedCategoryId,
    filters,
    updateFilters,
    fetchProducts,
}) => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    const loadCategories = async () => {
        setLoading(true);
        setErrorMessage("");

        try {
            const response = await getCategories({
                page: 1,
                limit: 20,
                sortedBy: "name",
            });

            setCategories(response.data || []);
        } catch (error) {
            if (
                error &&
                error.response &&
                error.response.data &&
                error.response.data.message
            ) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage("Categories could not be loaded.");
            }

            setCategories([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCategories();
    }, []);

    const handleCategoryChange = async (e) => {
        const nextFilters = {
            ...filters,
            categoryId: e.target.value,
            page: 1,
        };

        updateFilters(nextFilters);
        await fetchProducts(nextFilters);
    };

    if (loading) {
        return (
            <div className="mb-6 flex justify-center">
                <p className="text-xs">LOADING CATEGORIES...</p>
            </div>
        );
    }

    if (errorMessage) {
        return (
            <div className="mb-6 flex justify-center">
                <p className="text-xs">{errorMessage}</p>
            </div>
        );
    }

    if (!categories.length) {
        return null;
    }

    return (
        <div className="flex flex-col items-center gap-3">
            <label
                htmlFor="product-category-filter"
                className="text-center text-xs"
            >
                FILTER BY CATEGORY
            </label>

            <select
                id="product-category-filter"
                value={selectedCategoryId || ""}
                onChange={handleCategoryChange}
                className="w-full min-w-[320px] max-w-85 border-4 border-[#030712] bg-[#fff6cc] px-4 py-3 text-xs text-[#030712] outline-none shadow-[5px_5px_0_#030712] dark:border-white dark:bg-slate-800 dark:text-white dark:shadow-[5px_5px_0_#ffffff]"
            >
                <option value="">ALL CATEGORIES</option>

                {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                        {category.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default ProductCategoryFilter;