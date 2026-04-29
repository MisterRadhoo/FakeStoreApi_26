import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../productsApi.js";

const ProductDetailsPage = () => {
    const { productId } = useParams();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadProduct = async () => {
            setLoading(true);

            try {
                const response = await getProductById(productId);
                setProduct(response.data || null);
            } catch {
                setProduct(null);
            } finally {
                setLoading(false);
            }
        };

        if (!productId) {
            setProduct(null);
            return;
        }

        loadProduct();
    }, [productId]);

    if (loading) {
        return (
            <main className="pixel-font min-h-screen bg-[#fff1b8] px-6 py-16 text-[#030712] dark:bg-[#111827] dark:text-white">
                <section className="mx-auto max-w-5xl border-4 border-[#030712] bg-white p-8 text-center shadow-[12px_12px_0_#030712] dark:border-white dark:bg-[#1f2937] dark:shadow-[12px_12px_0_#ffffff]">
                    LOADING...
                </section>
            </main>
        );
    }

    if (!product) {
        return (
            <main className="pixel-font min-h-screen bg-[#fff1b8] px-6 py-16 text-[#030712] dark:bg-[#111827] dark:text-white">
                <section className="mx-auto max-w-5xl border-4 border-[#030712] bg-white p-8 text-center shadow-[12px_12px_0_#030712] dark:border-white dark:bg-[#1f2937] dark:shadow-[12px_12px_0_#ffffff]">
                    PRODUCT NOT FOUND
                </section>
            </main>
        );
    }

    return (
        <main className="pixel-font min-h-screen bg-[#fff1b8] px-6 py-16 text-[#030712] dark:bg-[#111827] dark:text-white">
            <section className="mx-auto max-w-5xl border-4 border-[#030712] bg-white p-8 shadow-[12px_12px_0_#030712] dark:border-white dark:bg-[#1f2937] dark:shadow-[12px_12px_0_#ffffff]">
                <div className="grid gap-10 md:grid-cols-2">
                    <div className="flex items-center justify-center border-4 border-[#030712] bg-white p-4 dark:border-white dark:bg-slate-900">
                        {product.imageCover && (
                            <img
                                src={product.imageCover}
                                alt={product.title}
                                className="h-full max-h-105 w-full object-contain"
                            />
                        )}
                    </div>

                    <div>
                        <h1 className="mb-6 text-2xl text-[#ff3040] drop-shadow-[3px_3px_0_#030712] dark:drop-shadow-[3px_3px_0_#ffffff]">
                            {product.title}
                        </h1>

                        <div className="space-y-4 text-sm">
                            <p>
                                PRICE: {product.price} {product.currency}
                            </p>

                            <p>
                                RATE: {product.ratingsAverage || 0}
                            </p>

                            <p>
                                STOCK: {product.stock}
                            </p>

                            <p>
                                SOLD: {product.sold || 0}
                            </p>

                            {product.colors && product.colors.length > 0 ? (
                                <div>
                                    <p className="mb-3">COLORS:</p>
                                    <div className="flex flex-wrap gap-3">
                                        {product.colors.map((color, index) => (
                                            <div
                                                key={`${color}-${index}`}
                                                className="flex items-center gap-2"
                                            >
                                                <span
                                                    className="h-6 w-6 border-2 border-[#030712] dark:border-white"
                                                    style={{ backgroundColor: color }}
                                                />

                                                <span>{color}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : null}

                            {product.description ? (
                                <p className="pt-4 leading-7">
                                    {product.description}
                                </p>
                            ) : null}
                        </div>
                    </div>
                </div>

                {product.reviews && product.reviews.length > 0 ? (
                    <div className="mt-10 border-t-4 border-[#030712] pt-8 dark:border-white">
                        <h2 className="mb-6 text-xl text-[#ff3040] drop-shadow-[3px_3px_0_#030712] dark:drop-shadow-[3px_3px_0_#ffffff]">
                            REVIEWS
                        </h2>

                        <div className="space-y-5">
                            {product.reviews.map((review) => (
                                <article
                                    key={review._id}
                                    className="border-4 border-[#030712] bg-[#fff6cc] p-4 shadow-[6px_6px_0_#030712] dark:border-white dark:bg-[#374151] dark:shadow-[6px_6px_0_#ffffff]"
                                >
                                    <p className="mb-2 text-sm">
                                        USER: {review.userId && review.userId.userName ? review.userId.userName : "UNKNOWN"}
                                    </p>

                                    <p className="mb-2 text-sm">
                                        RATING: {review.ratings}
                                    </p>

                                    {review.title ? (
                                        <p className="text-sm leading-7">
                                            {review.title}
                                        </p>
                                    ) : null}
                                </article>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="mt-10 border-t-4 border-[#030712] pt-8 dark:border-white">
                        <h2 className="mb-6 text-xl text-[#ff3041b9] drop-shadow-[3px_3px_0_#030712] dark:drop-shadow-[3px_3px_0_#ffffff]">
                            REVIEWS
                        </h2>

                        <p className="text-sm">NO REVIEWS YET</p>
                    </div>
                )}
            </section>
        </main>
    );
};

export default ProductDetailsPage;