import { useEffect } from "react";
import { useProducts } from "../products/ProductsContext.jsx";
import ProductFilters from "../products/components/ProductFilters.jsx";
import ProductList from "../products/components/ProductList.jsx";
import ProductPagination from "../products/components/ProductPagination.jsx";


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
                <h1 className="mb-10 text-center text-3xl text-[#ff3040] drop-shadow-[4px_4px_0_#030712] dark:drop-shadow-[4px_4px_0_#ffffff]">
                    PRODUCTS
                </h1>

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
