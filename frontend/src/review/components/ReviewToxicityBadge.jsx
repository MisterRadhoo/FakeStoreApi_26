const badgeBaseClass =
    "inline-block border-2 px-2 py-1 text-[10px] font-black uppercase";

const notCheckedClass =
    "border-[#030712] bg-[#fff1b8] text-[#030712] dark:border-white dark:bg-slate-900 dark:text-white";

const toxicClass =
    "border-red-700 bg-red-200 text-red-700 dark:border-red-400 dark:bg-red-900 dark:text-red-300";

const cleanClass =
    "border-green-700 bg-green-200 text-green-700 dark:border-green-400 dark:bg-green-900 dark:text-green-300";

const formatPercent = (value) => {
    const numericValue = Number(value) || 0;
    const safeValue = Math.min(Math.max(numericValue, 0), 1);

    return `${(safeValue * 100).toFixed(1)}%`;
};

const getToxicityBadgeClass = (label) => {
    if (label === "Toxic") {
        return toxicClass;
    }

    if (label === "Clean") {
        return cleanClass;
    }

    return notCheckedClass;
};

const ReviewToxicityBadge = ({ toxicityResult }) => {
    const label =
        toxicityResult && toxicityResult.label
            ? toxicityResult.label
            : "Not Checked";

    const confidence =
        toxicityResult && toxicityResult.confidence
            ? formatPercent(toxicityResult.confidence)
            : "";

    return (
        <span className={`${badgeBaseClass} ${getToxicityBadgeClass(label)}`}>
            {confidence
                ? `TOXICITY: ${label} ${confidence}`
                : "TOXICITY: NOT CHECKED"}
        </span>
    );
};

export default ReviewToxicityBadge;