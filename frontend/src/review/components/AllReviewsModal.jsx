import { useEffect, useState } from "react";
import { getProductReviews } from "../reviewApi.js";
import { getReviewErrorMessage } from "../utils/reviewUtils.js";
import ReviewCard from "./ReviewCard.jsx";

const AllReviewsModal = ({ productId, productTitle, onClose }) => {
    const [reviews, setReviews] = useState([]);
    const [reviewsCount, setReviewsCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    const loadReviews = async () => {
        if (!productId) {
            setReviews([]);
            setReviewsCount(0);
            setLoading(false);
            return;
        }

        setLoading(true);
        setErrorMessage("");

        try {
            const response = await getProductReviews({
                productId,
                page: 1,
                limit: 50,
            });

            const reviewsList =
                response && Array.isArray(response.list)
                    ? response.list
                    : [];

            setReviews(reviewsList);
            setReviewsCount(
                response && typeof response.count === "number"
                    ? response.count
                    : reviewsList.length
            );
        } catch (error) {
            setErrorMessage(
                getReviewErrorMessage(error, "Reviews could not be loaded!")
            );

            setReviews([]);
            setReviewsCount(0);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadReviews();
    }, [productId]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-6">
            <div className="pixel-font max-h-[90vh] w-full max-w-4xl overflow-y-auto border-4 border-[#030712] bg-white p-6 shadow-[12px_12px_0_#030712] dark:border-white dark:bg-[#1f2937] dark:text-white dark:shadow-[12px_12px_0_#ffffff]">
                <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b-4 border-[#030712] pb-4 dark:border-white">
                    <div>
                        <h2 className="text-2xl text-[#ff3040] drop-shadow-[3px_3px_0_#030712] dark:drop-shadow-[3px_3px_0_#ffffff]">
                            ALL REVIEWS
                        </h2>

                        <p className="mt-2 text-xs">{productTitle}</p>

                        {!loading && !errorMessage ? (
                            <p className="mt-2 text-xs">
                                TOTAL REVIEWS: {reviewsCount}
                            </p>
                        ) : null}
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="border-4 border-[#030712] bg-[#ff9aa2] px-4 py-2 text-xs text-[#030712] shadow-[4px_4px_0_#030712] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none dark:border-white dark:bg-red-700 dark:text-white dark:shadow-[4px_4px_0_#ffffff]"
                    >
                        CLOSE
                    </button>
                </div>

                {loading ? (
                    <p className="text-sm">LOADING REVIEWS...</p>
                ) : errorMessage ? (
                    <p className="border-4 border-[#030712] bg-[#ff9aa2] px-4 py-3 text-xs text-[#030712] shadow-[4px_4px_0_#030712] dark:border-white dark:bg-red-700 dark:text-white dark:shadow-[4px_4px_0_#ffffff]">
                        {errorMessage}
                    </p>
                ) : reviews.length > 0 ? (
                    <div className="space-y-5">
                        {reviews.map((review) => (
                            <ReviewCard
                                key={review._id}
                                review={review}
                                canManage={false}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-sm">NO REVIEWS YET</p>
                )}
            </div>
        </div>
    );
};

export default AllReviewsModal;