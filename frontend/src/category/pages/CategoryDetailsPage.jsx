import { Link, useNavigate, useParams } from "react-router-dom";
import useCategoryDetails from "../hooks/useCategoryDetails.js";

const CategoryDetailsPage = () => {
    const { categoryId } = useParams();
    const navigate = useNavigate();

    const {
        category,
        products,
        productsCount,
        loading,
        errorMessage,
    } = useCategoryDetails(categoryId);

    if (loading) {
        return (
            <main className="pixel-font min-h-screen bg-[#fff1b8] px-6 py-16 text-[#030712] dark:bg-[#111827] dark:text-white">
                <section className="mx-auto max-w-6xl border-4 border-[#030712] bg-white p-8 text-center shadow-[12px_12px_0_#030712] dark:border-white dark:bg-[#1f2937] dark:shadow-[12px_12px_0_#ffffff]">
                    LOADING CATEGORY...
                </section>
            </main>
        );
    }

    if (errorMessage) {
        return (
            <main className="pixel-font min-h-screen bg-[#fff1b8] px-6 py-16 text-[#030712] dark:bg-[#111827] dark:text-white">
                <section className="mx-auto max-w-6xl border-4 border-[#030712] bg-[#ff9aa2] p-8 text-center shadow-[12px_12px_0_#030712] dark:border-white dark:bg-red-700 dark:shadow-[12px_12px_0_#ffffff]">
                    {errorMessage}
                </section>
            </main>
        );
    }

    if (!category) {
        return (
            <main className="pixel-font min-h-screen bg-[#fff1b8] px-6 py-16 text-[#030712] dark:bg-[#111827] dark:text-white">
                <section className="mx-auto max-w-6xl border-4 border-[#030712] bg-white p-8 text-center shadow-[12px_12px_0_#030712] dark:border-white dark:bg-[#1f2937] dark:shadow-[12px_12px_0_#ffffff]">
                    CATEGORY NOT FOUND
                </section>
            </main>
        );
    }

    return (
        <main className="pixel-font min-h-screen bg-[#fff1b8] px-6 py-16 text-[#030712] dark:bg-[#111827] dark:text-white">
            <section className="mx-auto max-w-6xl border-4 border-[#030712] bg-white p-8 shadow-[12px_12px_0_#030712] dark:border-white dark:bg-[#1f2937] dark:shadow-[12px_12px_0_#ffffff]">
                <div className="mb-6">
                    <button
                        type="button"
                        onClick={() => navigate("/categories")}
                        className="border-4 border-[#030712] bg-[#8ec5ff] px-4 py-2 text-xs text-[#030712] shadow-[4px_4px_0_#030712] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none dark:border-white dark:bg-blue-700 dark:text-white dark:shadow-[4px_4px_0_#ffffff]"
                    >
                        BACK TO CATEGORIES
                    </button>
                </div>

                <div className="mb-8 grid gap-8 md:grid-cols-2">
                    <div className="flex items-center justify-center border-4 border-[#030712] bg-white p-4 dark:border-white dark:bg-slate-900">
                        {category.image ? (
                            <img
                                src={category.image}
                                alt={category.name}
                                className="h-full max-h-80 w-full object-contain"
                            />
                        ) : (
                            <div className="flex h-80 w-full items-center justify-center text-sm">
                                NO CATEGORY IMAGE
                            </div>
                        )}
                    </div>

                    <div className="border-b-4 border-[#030712] pb-4 dark:border-white">
                        <h1 className="text-3xl text-[#ff3040] drop-shadow-[3px_3px_0_#030712] dark:drop-shadow-[3px_3px_0_#ffffff]">
                            {category.name}
                        </h1>

                        {category.slug ? (
                            <p className="mt-3 text-xs">
                                SLUG: {category.slug}
                            </p>
                        ) : null}
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <h2 className="text-xl">
                            PRODUCTS IN CATEGORY
                        </h2>

                        <p className="text-sm">
                            TOTAL PRODUCTS: {productsCount}
                        </p>
                    </div>

                    {products.length > 0 ? (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {products.map((product) => (
                                <Link
                                    key={product._id}
                                    to={`/products/${product._id}`}
                                    className="block border-4 border-[#030712] bg-white p-5 shadow-[6px_6px_0_#030712] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none dark:border-white dark:bg-[#111827] dark:text-white dark:shadow-[6px_6px_0_#ffffff]"
                                >
                                    <h3 className="text-lg text-[#ff3040] drop-shadow-[2px_2px_0_#030712] dark:drop-shadow-[2px_2px_0_#ffffff]">
                                        {product.title}
                                    </h3>

                                    <p className="mt-3 text-sm">
                                        PRICE: {product.price} {product.currency}
                                    </p>

                                    <p className="mt-2 text-sm">
                                        RATE: {product.ratingsAverage || 0}
                                    </p>

                                    <p className="mt-2 text-sm">
                                        STOCK: {product.stock}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm">NO PRODUCTS IN THIS CATEGORY</p>
                    )}
                </div>
            </section>
        </main>
    );
};

export default CategoryDetailsPage;