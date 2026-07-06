import { useAllProductReviews } from "../hooks/useAllProductReviews.js";
import { useReviewToxicity } from "../hooks/useReviewToxicity.js";
import AllProductReviewCard from "../components/AllProductReviewCard.jsx";

const pageClass =
    "pixel-font min-h-screen bg-[#fff1b8] px-6 py-16 text-[#030712] dark:bg-[#111827] dark:text-white";

const sectionClass =
    "mx-auto max-w-6xl border-4 border-[#030712] bg-white p-8 shadow-[12px_12px_0_#030712] dark:border-white dark:bg-[#1f2937] dark:shadow-[12px_12px_0_#ffffff]";

const errorClass =
    "mb-6 border-4 border-[#030712] bg-[#ff9aa2] px-4 py-3 text-xs text-[#030712] shadow-[4px_4px_0_#030712] dark:border-white dark:bg-red-700 dark:text-white dark:shadow-[4px_4px_0_#ffffff]";

const paginationButtonClass =
    "border-4 border-[#030712] bg-[#ff3040] px-5 py-3 text-xs text-white shadow-[5px_5px_0_#030712] transition hover:-translate-y-1 hover:bg-[#ffcc00] hover:text-[#030712] hover:shadow-[7px_7px_0_#030712] active:translate-x-1 active:translate-y-1 active:shadow-[2px_2px_0_#030712] disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-gray-700 disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-[5px_5px_0_#030712] dark:border-white dark:bg-[#ff3040] dark:text-white dark:shadow-[5px_5px_0_#ffffff] dark:hover:bg-[#ffcc00] dark:hover:text-[#030712] dark:hover:shadow-[7px_7px_0_#ffffff] dark:active:shadow-[2px_2px_0_#ffffff]";

const paginationInfoClass =
    "border-4 border-[#030712] bg-[#fff1b8] px-5 py-3 text-center text-xs shadow-[5px_5px_0_#030712] dark:border-white dark:bg-[#374151] dark:shadow-[5px_5px_0_#ffffff]";


const AllProductReviewsPage = () => {
    const {
        reviews,
        pagination,
        isLoadingReviews,
        reviewsError,
        goToNextPage,
        goToPrevPage
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

                <div className="mt-10 flex items-center justify-between gap-4">
                    <button
                        type="button"
                        disabled={!pagination.hasPrevPage}
                        onClick={goToPrevPage}
                        className={paginationButtonClass}
                    >
                        PREV
                    </button>

                    <div className={paginationInfoClass}>
                        <p>
                            PAGE {pagination.page} OF {pagination.totalPages}
                        </p>
                        <p className="mt-2">
                            TOTAL REVIEWS: {pagination.totalReviews}
                        </p>
                    </div>

                    <button
                        type="button"
                        disabled={!pagination.hasNextPage}
                        onClick={goToNextPage}
                        className={paginationButtonClass}
                    >
                        NEXT
                    </button>
                </div>
            </section>
        </main>
    );
};

export default AllProductReviewsPage;