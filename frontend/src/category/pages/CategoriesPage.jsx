import { useEffect, useState } from "react";
import { getCategories } from "../categoryApi.js";
import CategoryCard from "../components/CategoryCard.jsx";

const CategoriesPage = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    const loadCategories = async () => {
        setLoading(true);
        setErrorMessage("");

        try {
            const response = await getCategories({
                page: 1,
                limit: 35,
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

    if (loading) {
        return (
            <main className="pixel-font min-h-screen bg-[#fff1b8] px-6 py-16 text-[#030712] dark:bg-[#111827] dark:text-white">
                <section className="mx-auto max-w-6xl border-4 border-[#030712] bg-white p-8 text-center shadow-[12px_12px_0_#030712] dark:border-white dark:bg-[#1f2937] dark:shadow-[12px_12px_0_#ffffff]">
                    LOADING CATEGORIES...
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

    return (
        <main className="pixel-font min-h-screen bg-[#fff1b8] px-6 py-16 text-[#030712] dark:bg-[#111827] dark:text-white">
            <section className="mx-auto max-w-6xl border-4 border-[#030712] bg-white p-8 shadow-[12px_12px_0_#030712] dark:border-white dark:bg-[#1f2937] dark:shadow-[12px_12px_0_#ffffff]">
                <div className="mb-8 border-b-4 border-[#030712] pb-4 dark:border-white">
                    <h1 className="text-3xl text-[#ff3040] drop-shadow-[3px_3px_0_#030712] dark:drop-shadow-[3px_3px_0_#ffffff]">
                        CATEGORIES
                    </h1>
                </div>

                {categories.length > 0 ? (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {categories.map((category) => (
                            <CategoryCard
                                key={category._id}
                                category={category}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-sm">NO CATEGORIES YET</p>
                )}
            </section>
        </main>
    );
};

export default CategoriesPage;