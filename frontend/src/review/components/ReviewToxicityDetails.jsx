const formatPercent = (value) => {
    const numericValue = Number(value) || 0;
    const safeValue = Math.min(Math.max(numericValue, 0), 1);

    return `${(safeValue * 100).toFixed(1)}%`;
};

const formatCategoryLabel = (label) => {
    return String(label || "").replace(/_/g, " ");
};

const getCategoryClass = (match) => {
    if (match) {
        return "border-red-700 bg-red-200 text-red-700 dark:border-red-400 dark:bg-red-900 dark:text-red-300";
    }

    return "border-green-700 bg-green-200 text-green-700 dark:border-green-400 dark:bg-green-900 dark:text-green-300";
};

const getBarClass = (match) => {
    if (match) {
        return "h-full bg-red-500";
    }

    return "h-full bg-green-500";
};

const ReviewToxicityDetails = ({ toxicityResult }) => {
    if (
        !toxicityResult ||
        !toxicityResult.categories ||
        !toxicityResult.categories.length
    ) {
        return null;
    }

    return (
        <div className="mt-4 border-2 border-[#030712] bg-[#fff7d6] p-4 text-[10px] text-[#030712] dark:border-white dark:bg-slate-900 dark:text-white">
            <p className="mb-4 font-black uppercase">
                TOXICITY DETAILS
            </p>

            <div className="space-y-4">
                {toxicityResult.categories.map((category) => {
                    const categoryPercent = formatPercent(category.score);

                    return (
                        <div key={category.label}>
                            <div className="mb-2 flex flex-wrap items-center justify-between gap-3">
                                <span
                                    className={`inline-block border-2 px-2 py-1 font-black uppercase ${getCategoryClass(category.match)}`}
                                >
                                    {formatCategoryLabel(category.label)}
                                </span>

                                <span className="font-black uppercase">
                                    CONFIDENCE: {categoryPercent}
                                </span>
                            </div>

                            <div className="h-4 border-2 border-[#030712] bg-white dark:border-white dark:bg-slate-950">
                                <div
                                    className={getBarClass(category.match)}
                                    style={{
                                        width: categoryPercent
                                    }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ReviewToxicityDetails;