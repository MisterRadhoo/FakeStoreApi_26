const getAiBadgeClass = (label) => {
    if (label === "Fake") {
        return "border-red-700 bg-red-200 text-red-700 dark:border-red-400 dark:bg-red-900 dark:text-red-300";
    }

    if (label === "Real") {
        return "border-green-700 bg-green-200 text-green-700 dark:border-green-400 dark:bg-green-900 dark:text-green-300";
    }

    return "border-[#030712] bg-[#fff1b8] text-[#030712] dark:border-white dark:bg-slate-900 dark:text-white";
};

const formatAiConfidence = (value) => {
    const numericValue = Number(value) || 0;
    return `${(numericValue * 100).toFixed(1)}%`;
};

const ReviewAiBadge = ({ aiStatus }) => {
    const label = aiStatus && aiStatus.label ? aiStatus.label : "NotAnalyzed";
    const isAnalyzed = label !== "NotAnalyzed";

    return (
        <div className="mb-3">
            <span
                className={`inline-block border-2 px-2 py-1 text-[10px] font-black uppercase ${getAiBadgeClass(label)}`}
            >
                {isAnalyzed
                    ? `AI: ${label} ${formatAiConfidence(aiStatus.confidence)}`
                    : "AI: NOT ANALYZED"}
            </span>
        </div>
    );
};

export default ReviewAiBadge;