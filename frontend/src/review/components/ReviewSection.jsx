import { useMemo, useState } from "react";
import { useAuth } from "../../auth/AuthContext.jsx";
import {
    createReview,
    updateReview,
    deleteReview
} from "../reviewApi.js";
import { useReviewAnalysis } from "../hooks/useReviewAnalysis.js";
import { getReviewUserId, getReviewErrorMessage } from "../utils/reviewUtils.js";
import ReviewForm from "./ReviewForm.jsx";
import ReviewCard from "./ReviewCard.jsx";
import ReviewAiPanel from "./ReviewAiPanel.jsx";

const ReviewSection = ({ productId, productTitle, reviews, reloadProduct }) => {
    const { user, isAuthenticated } = useAuth();

    const [editingReview, setEditingReview] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [deletingReviewId, setDeletingReviewId] = useState("");

    const {
        analysisResult,
        analysisError,
        isAnalyzing,
        resetAnalysis,
        handleAnalyzeReview
    } = useReviewAnalysis();

    const loggedUserId =
        user && (user._id || user.id) ? String(user._id || user.id) : "";

    const loggedUserReview = useMemo(() => {
        if (!reviews || !loggedUserId) {
            return null;
        }

        return reviews.find((review) => getReviewUserId(review) === loggedUserId) || null;
    }, [reviews, loggedUserId]);

    const resetMessages = () => {
        setErrorMessage("");
        setSuccessMessage("");
    };

    const handleCreateReview = async (reviewData) => {
        resetMessages();
        resetAnalysis();
        setIsSubmitting(true);

        try {
            await createReview({
                ...reviewData,
                productId,
            });

            setSuccessMessage("Review added successfully.");
            await reloadProduct();
        } catch (error) {
            setErrorMessage(
                getReviewErrorMessage(
                    error,
                    "You already created a review for this product."
                )
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleUpdateReview = async (reviewData) => {
        if (!editingReview || !editingReview._id) {
            return;
        }

        resetMessages();
        resetAnalysis();
        setIsSubmitting(true);

        try {
            await updateReview({
                reviewId: editingReview._id,
                reviewData,
            });

            setEditingReview(null);
            setSuccessMessage("Review updated successfully.");
            await reloadProduct();
        } catch (error) {
            setErrorMessage(
                getReviewErrorMessage(error, "Review could not be updated.")
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteReview = async (reviewId) => {
        if (!reviewId || deletingReviewId) {
            return;
        }

        resetMessages();
        resetAnalysis();
        setDeletingReviewId(reviewId);

        try {
            await deleteReview(reviewId);

            if (editingReview && editingReview._id === reviewId) {
                setEditingReview(null);
            }

            setSuccessMessage("Review deleted successfully.");
            await reloadProduct();
        } catch (error) {
            setErrorMessage(
                getReviewErrorMessage(error, "Review could not be deleted.")
            );
        } finally {
            setDeletingReviewId("");
        }
    };

    const handleAnalyzeLoggedUserReview = async (reviewId) => {
        await handleAnalyzeReview(reviewId);
        await reloadProduct();
    };

    const handleCancelEdit = () => {
        setEditingReview(null);
        resetMessages();
        resetAnalysis();
    };

    return (
        <section className="mt-10 border-4 border-[#030712] bg-white p-6 shadow-[10px_10px_0_#030712] dark:border-white dark:bg-[#1f2937] dark:text-white dark:shadow-[10px_10px_0_#ffffff]">
            <div className="mb-6 border-b-4 border-[#030712] pb-4 dark:border-white">
                <h2 className="text-2xl text-[#ff3040] drop-shadow-[3px_3px_0_#030712] dark:drop-shadow-[3px_3px_0_#ffffff]">
                    YOUR REVIEW
                </h2>

                <p className="mt-2 text-xs">{productTitle}</p>
            </div>

            {!isAuthenticated ? (
                <p className="text-sm">
                    YOU MUST BE LOGGED IN TO WRITE A REVIEW!
                </p>
            ) : editingReview ? (
                <ReviewForm
                    initialValues={editingReview}
                    onSubmit={handleUpdateReview}
                    onCancel={handleCancelEdit}
                    submitLabel="UPDATE REVIEW"
                    errorMessage={errorMessage}
                    successMessage={successMessage}
                    isSubmitting={isSubmitting}
                />
            ) : !loggedUserReview ? (
                <ReviewForm
                    initialValues={null}
                    onSubmit={handleCreateReview}
                    submitLabel="ADD REVIEW"
                    errorMessage={errorMessage}
                    successMessage={successMessage}
                    isSubmitting={isSubmitting}
                />
            ) : (
                <div className="space-y-4">
                    {errorMessage ? (
                        <p className="border-4 border-[#030712] bg-[#ff9aa2] px-4 py-3 text-xs text-[#030712] shadow-[4px_4px_0_#030712] dark:border-white dark:bg-red-700 dark:text-white dark:shadow-[4px_4px_0_#ffffff]">
                            {errorMessage}
                        </p>
                    ) : null}

                    {successMessage ? (
                        <p className="border-4 border-[#030712] bg-[#b9fbc0] px-4 py-3 text-xs text-[#030712] shadow-[4px_4px_0_#030712] dark:border-white dark:bg-green-700 dark:text-white dark:shadow-[4px_4px_0_#ffffff]">
                            {successMessage}
                        </p>
                    ) : null}

                    <ReviewCard
                        review={loggedUserReview}
                        canManage
                        onEdit={setEditingReview}
                        onDelete={handleDeleteReview}
                        onAnalyze={handleAnalyzeLoggedUserReview}
                        isDeleting={deletingReviewId === loggedUserReview._id}
                        isAnalyzing={isAnalyzing}
                    />

                    <ReviewAiPanel
                        analysisResult={analysisResult}
                        analysisError={analysisError}
                        isAnalyzing={isAnalyzing}
                    />
                </div>
            )}
        </section>
    );
};

export default ReviewSection;