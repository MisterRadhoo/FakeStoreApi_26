const badgeBaseClass =
    "inline-block border-2 px-2 py-1 text-[10px] font-black uppercase";

const badgeClasses = {
    default:
        "border-[#030712] bg-[#fff1b8] text-[#030712] dark:border-white dark:bg-slate-900 dark:text-white",
    Toxic:
        "border-red-700 bg-red-200 text-red-700 dark:border-red-400 dark:bg-red-900 dark:text-red-300",
    Clean:
        "border-green-700 bg-green-200 text-green-700 dark:border-green-400 dark:bg-green-900 dark:text-green-300"
};

const formatPercent = (value) => {
    const numericValue = Number(value) || 0;
    const safeValue = Math.min(Math.max(numericValue, 0), 1);

    return `${(safeValue * 100).toFixed(1)}%`;
};

const formatCategoryLabel = (label) => {
    return String(label || "").replace(/_/g, " ");
};

const getBadgeClass = (label) => {
    return badgeClasses[label] || badgeClasses.default;
};

const getBadgeContent = (toxicityResult) => {
    if (!toxicityResult || toxicityResult.label === "NotAnalyzed") {
        return "TOXICITY: NOT ANALYZED";
    }

    if (toxicityResult.label === "Clean") {
        return "TOXICITY: Clean";
    }

    const badgeLabel =
        toxicityResult.label === "Toxic" && toxicityResult.primaryCategory
            ? formatCategoryLabel(toxicityResult.primaryCategory)
            : toxicityResult.label;

    return `TOXICITY: ${badgeLabel} ${formatPercent(toxicityResult.confidence)}`;
};

const ReviewToxicityBadge = ({ toxicityResult }) => {
    const label = toxicityResult ? toxicityResult.label : null;

    return (
        <span className={`${badgeBaseClass} ${getBadgeClass(label)}`}>
            {getBadgeContent(toxicityResult)}
        </span>
    );
};

export default ReviewToxicityBadge;