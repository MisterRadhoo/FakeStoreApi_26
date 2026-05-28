const containerClass =
    "mt-4 border-2 border-[#030712] bg-[#fff7d6] p-4 text-[10px] text-[#030712] dark:border-white dark:bg-slate-900 dark:text-white";

const modelInfoClass =
    "mb-4 border-2 border-[#030712] bg-[#fff1b8] p-3 font-black uppercase dark:border-white dark:bg-slate-950";

const categoryBaseClass =
    "inline-block border-2 px-2 py-1 font-black uppercase";

const progressContainerClass =
    "h-4 border-2 border-[#030712] bg-white dark:border-white dark:bg-slate-950";

const matchStyles = {
    toxic: {
        category:
            "border-red-700 bg-red-200 text-red-700 dark:border-red-400 dark:bg-red-900 dark:text-red-300",
        bar: "h-full bg-red-500"
    },
    clean: {
        category:
            "border-green-700 bg-green-200 text-green-700 dark:border-green-400 dark:bg-green-900 dark:text-green-300",
        bar: "h-full bg-green-500"
    }
};

const formatPercent = (value) => {
    const numericValue = Number(value) || 0;
    const safeValue = Math.min(Math.max(numericValue, 0), 1);

    return `${(safeValue * 100).toFixed(1)}%`;
};

const formatCategoryLabel = (label) => {
    return String(label || "").replace(/_/g, " ");
};

const getMatchStyle = (match) => {
    return match ? matchStyles.toxic : matchStyles.clean;
};

const hasCategories = (toxicityResult) => {
    return Boolean(
        toxicityResult &&
        toxicityResult.categories &&
        toxicityResult.categories.length
    );
};

const ReviewToxicityDetails = ({ toxicityResult }) => {
    if (!hasCategories(toxicityResult)) {
        return null;
    }

    return (
        <div className={containerClass}>
            <p className="mb-4 font-black uppercase">
                TOXICITY DETAILS
            </p>
            {/* Model Name */}
            <div className={modelInfoClass}>
                <p>MODEL: @tensorflow-models/toxicity</p>
                <p>THRESHOLD: 0.75</p>
                <p>CATEGORIES: 7</p>
            </div>

            <div className="space-y-4">
                {toxicityResult.categories.map((category) => {
                    const categoryPercent = formatPercent(category.score);
                    const style = getMatchStyle(category.match);

                    return (
                        <div key={category.label}>
                            <div className="mb-2 flex flex-wrap items-center justify-between gap-3">
                                <span className={`${categoryBaseClass} ${style.category}`}>
                                    {formatCategoryLabel(category.label)}
                                </span>

                                <span className="font-black uppercase">
                                    CONFIDENCE: {categoryPercent}
                                </span>
                            </div>

                            <div className={progressContainerClass}>
                                <div
                                    className={style.bar}
                                    style={{ width: categoryPercent }}
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