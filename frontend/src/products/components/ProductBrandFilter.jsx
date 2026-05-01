import { useEffect, useState } from "react";
import { getBrands } from "../../brand/brandApi.js";

const ProductBrandFilter = ({
    selectedBrandId,
    filters,
    updateFilters,
    fetchProducts,
}) => {
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    const loadBrands = async () => {
        setLoading(true);
        setErrorMessage("");

        try {
            const response = await getBrands({
                page: 1,
                limit: 25,
                sortedBy: "name",
            });

            setBrands(response.data || []);
        } catch (error) {
            if (
                error &&
                error.response &&
                error.response.data &&
                error.response.data.message
            ) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage("Brands could not be loaded.");
            }

            setBrands([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadBrands();
    }, []);

    const handleBrandChange = async (e) => {
        const nextFilters = {
            ...filters,
            brandId: e.target.value,
            page: 1,
        };

        updateFilters(nextFilters);
        await fetchProducts(nextFilters);
    };

    if (loading) {
        return (
            <div className="mb-6 flex justify-center">
                <p className="text-xs">LOADING BRANDS...</p>
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

    if (!brands.length) {
        return null;
    }

    return (
        <div className="flex flex-col items-center gap-3">
            <label
                htmlFor="product-brand-filter"
                className="text-center text-xs"
            >
                FILTER BY BRAND
            </label>

            <select
                id="product-brand-filter"
                value={selectedBrandId || ""}
                onChange={handleBrandChange}
                className="w-full min-w-[320px] max-w-85 border-4 border-[#030712] bg-[#fff6cc] px-4 py-3 text-xs text-[#030712] outline-none shadow-[5px_5px_0_#030712] dark:border-white dark:bg-slate-800 dark:text-white dark:shadow-[5px_5px_0_#ffffff]"
            >
                <option value="">ALL BRANDS</option>

                {brands.map((brand) => (
                    <option key={brand._id} value={brand._id}>
                        {brand.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default ProductBrandFilter;