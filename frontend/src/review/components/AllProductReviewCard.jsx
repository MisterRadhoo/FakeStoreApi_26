import { Link } from "react-router-dom";
import { getReviewToxicityAnalyzedDateLabel } from "../utils/reviewDate.js";
import ReviewToxicityBadge from "./ReviewToxicityBadge.jsx";
import ReviewToxicityDetails from "./ReviewToxicityDetails.jsx";

const cardClass =
    "border-4 border-[#030712] bg-[#fff6cc] p-5 shadow-[6px_6px_0_#030712] dark:border-white dark:bg-[#374151] dark:shadow-[6px_6px_0_#ffffff]";

const buttonClass =
    "border-4 border-[#030712] bg-[#b9fbc0] px-4 py-2 text-[10px] text-[#030712] shadow-[4px_4px_0_#030712] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none disabled:cursor-not-allowed disabled:opacity-60 dark:border-white dark:bg-green-700 dark:text-white dark:shadow-[4px_4px_0_#ffffff]";

const errorClass =
    "border-4 border-[#030712] bg-[#ff9aa2] px-4 py-3 text-[10px] text-[#030712] shadow-[4px_4px_0_#030712] dark:border-white dark:bg-red-700 dark:text-white dark:shadow-[4px_4px_0_#ffffff]";

const AllProductReviewCard = ({
    review,
    toxicityResult,
    toxicityError,
    showToxicityDetails,
    analyzingToxicityId,
    handleAnalyzeToxicity
}) => {
    const isChecking = analyzingToxicityId === review._id;

    const toxicityDateLabel = getReviewToxicityAnalyzedDateLabel(toxicityResult);

    return (
        <article className={cardClass}>
            <p className="mb-2 text-xs">
                PRODUCT:{" "}
                {review.productId && review.productId._id ? (
                    <Link
                        to={`/products/${review.productId._id}`}
                        className="text-[#ff3040] underline"
                    >
                        {review.productId.title}
                    </Link>
                ) : (
                    "DELETED PRODUCT"
                )}
            </p>

            <p className="mb-2 text-xs">
                USER:{" "}
                {review.userId && review.userId.userName
                    ? review.userId.userName
                    : "DELETED USER"}
            </p>

            <p className="mb-2 text-xs">
                RATING: {review.ratings}
            </p>

            <p className="mb-4 break-all text-sm leading-7">
                {review.title}
            </p>

            <div className="mb-4 flex flex-wrap items-center gap-3">
                <ReviewToxicityBadge toxicityResult={toxicityResult} />

                <button
                    type="button"
                    onClick={() => handleAnalyzeToxicity(review)}
                    disabled={isChecking}
                    className={buttonClass}
                >
                    {isChecking ? "CHECKING..." : "TOXICITY CHECK"}
                </button>
            </div>

            {toxicityDateLabel ? (
                <p className="mb-2 text-[10px]">
                    {toxicityDateLabel}
                </p>
            ) : null}

            {toxicityError ? (
                <p className={errorClass}>
                    {toxicityError}
                </p>
            ) : null}


            {showToxicityDetails ? (
                <ReviewToxicityDetails toxicityResult={toxicityResult} />
            ) : null}

        </article>
    );
};

export default AllProductReviewCard;