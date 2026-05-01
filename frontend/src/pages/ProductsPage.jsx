import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../products/ProductsContext.jsx";
import ProductFilters from "../products/components/ProductFilters.jsx";
import ProductList from "../products/components/ProductList.jsx";
import ProductPagination from "../products/components/ProductPagination.jsx";
import ProductCategoryFilter from "../products/components/ProductCategoryFilter.jsx";
import ProductBrandFilter from "../products/components/ProductBrandFilter.jsx";


const ProductPage = () => {
    const {
        products,
        paginationResult,
        loading,
        filters,
        updateFilters,
        applyFilters,
        resetFilters,
        changePage,
        fetchProducts,
    } = useProducts();

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <main className="pixel-font min-h-screen bg-[#fff1b8] px-6 py-16 text-[#030712] dark:bg-[#111827] dark:text-white">
            <section className="mx-auto max-w-7xl border-4 border-[#030712] bg-white p-8 shadow-[12px_12px_0_#030712] dark:border-white dark:bg-[#1f2937] dark:shadow-[12px_12px_0_#ffffff]">
                <div className="mb-10 text-center">
                    <h1 className="mb-10 text-center text-3xl text-[#ff3040] drop-shadow-[4px_4px_0_#030712] dark:drop-shadow-[4px_4px_0_#ffffff]">
                        PRODUCTS
                    </h1>

                    <div className="mt-5">
                        <Link
                            to="/categories"
                            className="inline-block border-4 border-[#030712] bg-[#6E260E] px-4 py-3 text-xs text-[#030712] shadow-[5px_5px_0_#030712] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none dark:border-white dark:bg-blue-700 dark:text-white dark:shadow-[5px_5px_0_#ffffff]"
                        >
                            VIEW CATEGORIES
                        </Link>
                    </div>
                </div>

                <div className="mb-8 flex flex-col items-center gap-6 md:flex-row md:justify-center md:items-end">
                    <ProductCategoryFilter
                        selectedCategoryId={filters.categoryId}
                        filters={filters}
                        updateFilters={updateFilters}
                        fetchProducts={fetchProducts}
                    />

                    <ProductBrandFilter
                        selectedBrandId={filters.brandId}
                        filters={filters}
                        updateFilters={updateFilters}
                        fetchProducts={fetchProducts}
                    />
                </div>

                <ProductFilters
                    filters={filters}
                    updateFilters={updateFilters}
                    applyFilters={applyFilters}
                    resetFilters={resetFilters}
                />

                <ProductList products={products} loading={loading} />

                {!loading && products.length > 0 && (
                    <ProductPagination
                        paginationResult={paginationResult}
                        changePage={changePage}
                    />
                )}
            </section>
        </main>
    );
};

export default ProductPage;
