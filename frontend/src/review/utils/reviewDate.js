// @desc Get Review date label
export const getReviewDateLabel = (review) => {
    if (!review || !review.createdAt) {
        return "";
    }

    const createdDate = new Date(review.createdAt);
    const updatedDate = review.updatedAt
        ? new Date(review.updatedAt)
        : createdDate;

    const isEdited = updatedDate.getTime() > createdDate.getTime();
    const displayDate = isEdited ? updatedDate : createdDate;

    const formattedDate = displayDate.toLocaleString("ro-RO", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
    });

    return isEdited
        ? `Edited: ${formattedDate}`
        : `Created: ${formattedDate}`;
};

// @desc Get Review AI analyzed date label
export const getReviewAiAnalyzedDateLabel = (review) => {
    if (
        !review ||
        !review.aiStatus ||
        review.aiStatus.label === "NotAnalyzed" ||
        !review.aiStatus.analyzedAt
    ) {
        return "";
    }

    const analyzedDate = new Date(review.aiStatus.analyzedAt);

    const formattedDate = analyzedDate.toLocaleString("ro-RO", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
    });

    return `AI Analyzed: ${formattedDate}`;
};


// @desc Check if toxicity analysis exists
export const hasReviewToxicityAnalysis = (toxicityResult) => {
    return (
        toxicityResult &&
        toxicityResult.label &&
        toxicityResult.label !== "NotAnalyzed" &&
        toxicityResult.analyzedAt
    );
};

// @desc Get Review toxicity analyzed date label
export const getReviewToxicityAnalyzedDateLabel = (toxicityResult) => {
    if (!hasReviewToxicityAnalysis(toxicityResult)) {
        return "";
    }

    const analyzedDate = new Date(toxicityResult.analyzedAt);

    const formattedDate = analyzedDate.toLocaleString("ro-RO", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
    });

    return `TOXICITY ANALYZED: ${formattedDate}`;
};