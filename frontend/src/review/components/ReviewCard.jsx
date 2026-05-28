import {
    getReviewDateLabel,
    getReviewAiAnalyzedDateLabel
}
    from "../utils/reviewDate";
import ReviewAiBadge from "./ReviewAiBadge.jsx";

const ReviewCard = ({
    review,
    canManage,
    onEdit,
    onDelete,
    onAnalyze,
    isDeleting,
    isAnalyzing,
    isSelected,
    onSelect
}) => {

    const buttonClass =
        "border-4 border-[#030712] px-4 py-2 text-[10px] text-[#030712] shadow-[4px_4px_0_#030712] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none disabled:cursor-not-allowed disabled:opacity-60 dark:border-white dark:text-white dark:shadow-[4px_4px_0_#ffffff]";

    const cardClass = isSelected
        ? "border-4 border-[#ff3040] bg-[#ffe3e6] p-4 shadow-[8px_8px_0_#ff3040] dark:border-[#ff8fa3] dark:bg-[#4b1f2a] dark:shadow-[8px_8px_0_#ff8fa3]"
        : "border-4 border-[#030712] bg-[#fff6cc] p-4 shadow-[6px_6px_0_#030712] dark:border-white dark:bg-[#374151] dark:shadow-[6px_6px_0_#ffffff]";

    const reviewDateLabel = getReviewDateLabel(review);
    const aiAnalyzedDateLabel = getReviewAiAnalyzedDateLabel(review);

    return (
        <article
            data-testid="review-card"
            onClick={onSelect ? () => onSelect(review) : undefined}
            className={`${cardClass} ${onSelect ? "cursor-pointer" : ""}`}
        >
            <div className="mb-2 flex items-center justify-between gap-3">
                <p
                    data-testid="review-user"
                    className="text-sm"
                >
                    USER: {review.userId && review.userId.userName ? review.userId.userName : "DELETED USER"}
                </p>

                {isSelected ? (
                    <span className="border-2 border-[#ff3040] bg-[#ffccd5] px-2 py-1 text-[10px] text-[#7f1d1d] dark:border-[#ff8fa3] dark:bg-[#7a2840] dark:text-[#ffd6de]">
                        SELECTED
                    </span>
                ) : null}
            </div>

            <p
                data-testid="review-rating"
                className="mb-2 text-sm"
            >
                RATING: {review.ratings}
            </p>


            {reviewDateLabel ? (
                <p className="mb-2 text-[10px]">
                    {reviewDateLabel}
                </p>
            ) : null}

            {aiAnalyzedDateLabel ? (
                <p className="mt-2 mb-2 text-[10px]">
                    {aiAnalyzedDateLabel}
                </p>
            ) : null}

            <ReviewAiBadge aiStatus={review.aiStatus} />

            {review.title ? (
                <p
                    data-testid="review-title-text"
                    className="break-all text-sm leading-7"
                >
                    {review.title}
                </p>
            ) : null}

            {canManage ? (
                <div className="mt-4 flex flex-wrap gap-3">
                    {onAnalyze ? (
                        <button
                            type="button"
                            data-testid="analyze-review-button"
                            onClick={(e) => {
                                e.stopPropagation();
                                onAnalyze(review._id);
                            }}
                            disabled={isAnalyzing}
                            className={`${buttonClass} bg-[#b9fbc0] dark:bg-green-700`}
                        >
                            {isAnalyzing ? "AI ANALYZING..." : "AI ANALYZE"}
                        </button>
                    ) : null}

                    <button
                        type="button"
                        data-testid="edit-review-button"
                        onClick={(e) => {
                            e.stopPropagation();
                            onEdit(review);
                        }}
                        className={`${buttonClass} bg-[#8ec5ff] dark:bg-blue-700`}
                    >
                        EDIT
                    </button>

                    <button
                        type="button"
                        data-testid="delete-review-button"
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete(review._id);
                        }}
                        disabled={isDeleting}
                        className={`${buttonClass} bg-[#ff9aa2] dark:bg-red-700`}
                    >
                        {isDeleting ? "DELETING..." : "DELETE"}
                    </button>
                </div>
            ) : null}
        </article>
    );
};

export default ReviewCard;