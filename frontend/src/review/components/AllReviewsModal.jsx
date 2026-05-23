import { useEffect, useState } from "react";
import { getProductReviews } from "../reviewApi.js";
import { getReviewErrorMessage } from "../utils/reviewUtils.js";
import { useEscapeClose } from "../hooks/useEscapeClose.js";
import { useReviewAnalysis } from "../hooks/useReviewAnalysis.js";
import ReviewCard from "./ReviewCard.jsx";
import ReviewAiPanel from "./ReviewAiPanel.jsx";

const AllReviewsModal = ({ productId, productTitle, onClose, reloadProduct }) => {
    const [reviews, setReviews] = useState([]);
    const [reviewsCount, setReviewsCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [selectedReview, setSelectedReview] = useState(null);

    const {
        analysisResult,
        analysisError,
        isAnalyzing,
        resetAnalysis,
        handleAnalyzeReview
    } = useReviewAnalysis();

    useEscapeClose(onClose);

    const loadReviews = async (selectedReviewId = "") => {
        if (!productId) {
            setReviews([]);
            setReviewsCount(0);
            setSelectedReview(null);
            resetAnalysis();
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

            if (selectedReviewId) {
                const updatedSelectedReview =
                    reviewsList.find((review) => review._id === selectedReviewId) || null;

                setSelectedReview(updatedSelectedReview);
            } else {
                setSelectedReview(null);
                resetAnalysis();
            }
        } catch (error) {
            setErrorMessage(
                getReviewErrorMessage(error, "Reviews could not be loaded!")
            );

            setReviews([]);
            setReviewsCount(0);
            setSelectedReview(null);
            resetAnalysis();
        } finally {
            setLoading(false);
        }
    };

    const handleSelectReview = (review) => {
        setSelectedReview(review);
        resetAnalysis();
    };

    const handleAnalyzeSelectedReview = async () => {
        if (!selectedReview || !selectedReview._id || isAnalyzing) {
            return;
        }

        const selectedReviewId = selectedReview._id;

        await handleAnalyzeReview(selectedReviewId);
        await loadReviews(selectedReviewId);

        if (reloadProduct) {
            await reloadProduct();
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
                        <div className="space-y-4">
                            {reviews.map((review) => (
                                <ReviewCard
                                    key={review._id}
                                    review={review}
                                    canManage={false}
                                    isSelected={selectedReview && selectedReview._id === review._id}
                                    onSelect={handleSelectReview}
                                />
                            ))}
                        </div>

                        <div className="border-t-4 border-[#030712] pt-4 dark:border-white">
                            <div className="mb-4 flex flex-wrap items-center gap-3">
                                <button
                                    type="button"
                                    onClick={handleAnalyzeSelectedReview}
                                    disabled={!selectedReview || isAnalyzing}
                                    className="border-4 border-[#030712] bg-[#b9fbc0] px-4 py-3 text-xs text-[#030712] shadow-[5px_5px_0_#030712] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none disabled:cursor-not-allowed disabled:opacity-60 dark:border-white dark:bg-green-700 dark:text-white dark:shadow-[5px_5px_0_#ffffff]"
                                >
                                    {isAnalyzing
                                        ? "AI ANALYZING..."
                                        : "AI ANALYZE SELECTED REVIEW"}
                                </button>

                                {selectedReview ? (
                                    <p className="text-xs">
                                        SELECTED REVIEW BY:{" "}
                                        {selectedReview.userId && selectedReview.userId.userName
                                            ? selectedReview.userId.userName
                                            : "DELETED USER"}
                                    </p>
                                ) : (
                                    <p className="text-xs">SELECT A REVIEW FIRST.</p>
                                )}
                            </div>

                            <ReviewAiPanel
                                analysisResult={analysisResult}
                                analysisError={analysisError}
                                isAnalyzing={isAnalyzing}
                            />
                        </div>
                    </div>
                ) : (
                    <p className="text-sm">NO REVIEWS YET</p>
                )}
            </div>
        </div>
    );
};

export default AllReviewsModal;