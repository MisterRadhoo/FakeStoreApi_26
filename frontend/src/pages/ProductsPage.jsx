import { useEffect } from "react";
import { useProducts } from "../products/ProductsContext.jsx";
import ProductCard from "../components/dashboard/ProductCard.jsx";

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

    const handleSubmit = (e) => {
        e.preventDefault();
        applyFilters();
    };

    const inputClass =
        "border-4 border-[#030712] bg-[#fff6cc] px-4 py-3 text-xs text-[#030712] outline-none shadow-[5px_5px_0_#030712] dark:border-white dark:bg-slate-800 dark:text-white dark:shadow-[5px_5px_0_#ffffff]";

    const buttonClass =
        "border-4 border-[#030712] px-4 py-3 text-xs text-[#030712] shadow-[5px_5px_0_#030712] active:translate-x-1.25 active:translate-y-1.25 active:shadow-none dark:border-white dark:text-white dark:shadow-[5px_5px_0_#ffffff]";

    return (
        <main className="pixel-font min-h-screen bg-[#fff1b8] px-6 py-16 text-[#030712] dark:bg-[#111827] dark:text-white">
            <section className="mx-auto max-w-7xl border-4 border-[#030712] bg-white p-8 shadow-[12px_12px_0_#030712] dark:border-white dark:bg-[#1f2937] dark:shadow-[12px_12px_0_#ffffff]">
                <h1 className="mb-10 text-center text-3xl text-[#ff3040] drop-shadow-[4px_4px_0_#030712] dark:drop-shadow-[4px_4px_0_#ffffff]">
                    PRODUCTS
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-6"
                >
                    <input
                        id="keyword"
                        name="keyword"
                        type="text"
                        placeholder="SEARCH"
                        value={filters.keyword}
                        onChange={(e) =>
                            updateFilters({
                                keyword: e.target.value,
                            })
                        }
                        className={inputClass}
                    />

                    <input
                        id="minPrice"
                        name="minPrice"
                        type="number"
                        placeholder="MIN PRICE"
                        value={filters.minPrice}
                        onChange={(e) =>
                            updateFilters({
                                minPrice: e.target.value,
                            })
                        }
                        className={inputClass}
                    />

                    <input
                        id="maxPrice"
                        name="maxPrice"
                        type="number"
                        placeholder="MAX PRICE"
                        value={filters.maxPrice}
                        onChange={(e) =>
                            updateFilters({
                                maxPrice: e.target.value,
                            })
                        }
                        className={inputClass}
                    />

                    <select
                        id="minRating"
                        name="minRating"
                        value={filters.minRating}
                        onChange={(e) =>
                            updateFilters({
                                minRating: e.target.value,
                            })
                        }
                        className={inputClass}
                    >
                        <option value="">RATING</option>
                        <option value="1">1+</option>
                        <option value="2">2+</option>
                        <option value="3">3+</option>
                        <option value="4">4+</option>
                        <option value="5">5</option>
                    </select>

                    <select
                        id="sortedBy"
                        name="sortedBy"
                        value={filters.sortedBy}
                        onChange={(e) =>
                            updateFilters({
                                sortedBy: e.target.value,
                            })
                        }
                        className={inputClass}
                    >
                        <option value="-createdAt">NEWEST</option>
                        <option value="createdAt">OLDEST</option>
                        <option value="price">PRICE LOW</option>
                        <option value="-price">PRICE HIGH</option>
                        <option value="-ratingsAverage">RATING</option>
                        <option value="-sold">SOLD</option>
                    </select>

                    <button
                        type="submit"
                        className={`${buttonClass} bg-[#8ec5ff] dark:bg-blue-700`}
                    >
                        FILTER
                    </button>
                </form>

                <button
                    type="button"
                    onClick={resetFilters}
                    className={`${buttonClass} mb-10 bg-[#ff9aa2] dark:bg-red-700`}
                >
                    RESET
                </button>

                {loading && (
                    <p className="py-16 text-center text-sm">LOADING...</p>
                )}

                {!loading && products.length === 0 && (
                    <p className="py-16 text-center text-sm">
                        NO PRODUCTS FOUND
                    </p>
                )}

                {!loading && products.length > 0 && (
                    <>
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                            {products.map((product) => (
                                <ProductCard
                                    key={product._id}
                                    product={product}
                                />
                            ))}
                        </div>

                        {paginationResult && (
                            <div className="mt-12 flex items-center justify-center gap-6">
                                <button
                                    type="button"
                                    disabled={!paginationResult.prevPage}
                                    onClick={() =>
                                        changePage(paginationResult.prevPage)
                                    }
                                    className={`${buttonClass} bg-[#8ec5ff] disabled:cursor-not-allowed disabled:bg-gray-300 disabled:opacity-60 dark:bg-blue-700 dark:disabled:bg-gray-700`}
                                >
                                    PREV
                                </button>

                                <span className="text-xs">
                                    {paginationResult.currentPage} /{" "}
                                    {paginationResult.numberOfPages}
                                </span>

                                <button
                                    type="button"
                                    disabled={!paginationResult.nextPage}
                                    onClick={() =>
                                        changePage(paginationResult.nextPage)
                                    }
                                    className={`${buttonClass} bg-[#8ec5ff] disabled:cursor-not-allowed disabled:bg-gray-300 disabled:opacity-60 dark:bg-blue-700 dark:disabled:bg-gray-700`}
                                >
                                    NEXT
                                </button>
                            </div>
                        )}
                    </>
                )}
            </section>
        </main>
    );
};

export default ProductPage;