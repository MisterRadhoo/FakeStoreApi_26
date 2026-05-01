const ProductDetailsCard = (
    { product, onOpenAllReviews }) => {
    return (
        <section className="mx-auto max-w-5xl border-4 border-[#030712] bg-white p-8 shadow-[12px_12px_0_#030712] dark:border-white dark:bg-[#1f2937] dark:text-white dark:shadow-[12px_12px_0_#ffffff]">
            <div className="grid gap-10 md:grid-cols-2">
                <div className="flex items-center justify-center border-4 border-[#030712] bg-white p-4 dark:border-white dark:bg-slate-900">
                    {product.imageCover ? (
                        <img
                            src={product.imageCover}
                            alt={product.title}
                            loading="lazy"
                            className="h-full max-h-105 w-full object-contain"
                        />
                    ) : null}
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
                                        <span
                                            key={`${color}-${index}`}
                                            className="border-2 border-[#030712] bg-white px-3 py-1 text-xs shadow-[3px_3px_0_#030712] dark:border-white dark:bg-slate-900 dark:shadow-[3px_3px_0_#ffffff]"
                                        >
                                            {color}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ) : null}

                        {product.description ? (
                            <p className="pt-4 leading-7">
                                {product.description}
                            </p>
                        ) : null}

                        <div className="pt-4">
                            <button
                                type="button"
                                onClick={onOpenAllReviews}
                                className="border-4 border-[#030712] bg-[#8ec5ff] px-4 py-3 text-xs text-[#030712] shadow-[5px_5px_0_#030712] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none dark:border-white dark:bg-blue-700 dark:text-white dark:shadow-[5px_5px_0_#ffffff]"
                            >
                                ALL REVIEWS ({product.ratingsQuantity || 0})
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductDetailsCard;