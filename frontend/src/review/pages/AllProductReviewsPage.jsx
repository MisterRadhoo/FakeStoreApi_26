import { useAllProductReviews } from "../hooks/useAllProductReviews.js";
import { useReviewToxicity } from "../hooks/useReviewToxicity.js";
import AllProductReviewCard from "../components/AllProductReviewCard.jsx";

const pageClass =
    "pixel-font min-h-screen bg-[#fff1b8] px-6 py-16 text-[#030712] dark:bg-[#111827] dark:text-white";

const sectionClass =
    "mx-auto max-w-6xl border-4 border-[#030712] bg-white p-8 shadow-[12px_12px_0_#030712] dark:border-white dark:bg-[#1f2937] dark:shadow-[12px_12px_0_#ffffff]";

const errorClass =
    "mb-6 border-4 border-[#030712] bg-[#ff9aa2] px-4 py-3 text-xs text-[#030712] shadow-[4px_4px_0_#030712] dark:border-white dark:bg-red-700 dark:text-white dark:shadow-[4px_4px_0_#ffffff]";

const AllProductReviewsPage = () => {
    const {
        reviews,
        isLoadingReviews,
        reviewsError
    } = useAllProductReviews();

    const {
        toxicityResults,
        toxicityErrors,
        visibleToxicityDetails,
        analyzingToxicityId,
        handleAnalyzeToxicity
    } = useReviewToxicity();

    if (isLoadingReviews) {
        return (
            <main className={pageClass}>
                <section className={`${sectionClass} text-center`}>
                    LOADING REVIEWS...
                </section>
            </main>
        );
    }

    return (
        <main className={pageClass}>
            <section className={sectionClass}>
                <h1 className="mb-8 text-center text-3xl text-[#ff3040] drop-shadow-[4px_4px_0_#030712] dark:drop-shadow-[4px_4px_0_#ffffff]">
                    ALL REVIEWS
                </h1>

                {reviewsError ? (
                    <p className={errorClass}>
                        {reviewsError}
                    </p>
                ) : null}

                {reviews.length ? (
                    <div className="space-y-6">
                        {reviews.map((review) => (
                            <AllProductReviewCard
                                key={review._id}
                                review={review}
                                toxicityResult={toxicityResults[review._id] || review.toxicityStatus}
                                toxicityError={toxicityErrors[review._id]}
                                showToxicityDetails={visibleToxicityDetails[review._id]}
                                analyzingToxicityId={analyzingToxicityId}
                                handleAnalyzeToxicity={handleAnalyzeToxicity}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-sm">NO REVIEWS FOUND</p>
                )}
            </section>
        </main>
    );
};

export default AllProductReviewsPage;