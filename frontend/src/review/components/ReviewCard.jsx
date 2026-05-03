const ReviewCard = ({ review, canManage, onEdit, onDelete, isDeleting }) => {
    const buttonClass =
        "border-4 border-[#030712] px-4 py-2 text-[10px] text-[#030712] shadow-[4px_4px_0_#030712] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none disabled:cursor-not-allowed disabled:opacity-60 dark:border-white dark:text-white dark:shadow-[4px_4px_0_#ffffff]";

    return (
        <article
            data-testid="review-card"
            className="border-4 border-[#030712] bg-[#fff6cc] p-4 shadow-[6px_6px_0_#030712] dark:border-white dark:bg-[#374151] dark:shadow-[6px_6px_0_#ffffff]">

            <p data-testid="review-user"
                className="mb-2 text-sm">
                USER: {review.userId && review.userId.userName ? review.userId.userName : "DELETED USER"}
            </p>

            <p
                data-testid="review-rating"
                className="mb-2 text-sm">
                RATING: {review.ratings}
            </p>

            {review.title ? (
                <p
                    data-testid="review-title-text"
                    className="text-sm leading-7">
                    {review.title}
                </p>
            ) : null}

            {canManage ? (
                <div className="mt-4 flex flex-wrap gap-3">
                    <button
                        type="button"
                        data-testid="edit-review-button"
                        onClick={() => onEdit(review)}
                        className={`${buttonClass} bg-[#8ec5ff] dark:bg-blue-700`}
                    >
                        EDIT
                    </button>

                    <button
                        type="button"
                        data-testid="delete-review-button"
                        onClick={() => onDelete(review._id)}
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