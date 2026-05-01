import { useEffect, useState } from "react";

const ReviewForm = ({
    initialValues,
    onSubmit,
    onCancel,
    submitLabel,
    errorMessage,
    successMessage,
    isSubmitting,
}) => {
    const [title, setTitle] = useState("");
    const [ratings, setRatings] = useState("5");

    useEffect(() => {
        if (!initialValues) {
            setTitle("");
            setRatings("5");
            return;
        }

        setTitle(initialValues.title || "");
        setRatings(initialValues.ratings ? String(initialValues.ratings) : "5");
    }, [initialValues]);

    const inputClass =
        "border-4 border-[#030712] bg-[#fff6cc] px-4 py-3 text-xs text-[#030712] outline-none shadow-[5px_5px_0_#030712] dark:border-white dark:bg-slate-800 dark:text-white dark:shadow-[5px_5px_0_#ffffff]";

    const buttonClass =
        "border-4 border-[#030712] px-4 py-3 text-xs text-[#030712] shadow-[5px_5px_0_#030712] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none disabled:cursor-not-allowed disabled:opacity-60 dark:border-white dark:text-white dark:shadow-[5px_5px_0_#ffffff]";

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isSubmitting) {
            return;
        }

        await onSubmit({
            title,
            ratings: Number(ratings),
        });
    };

    return (
        <form onSubmit={handleSubmit} className="mb-8 space-y-4">
            <div>
                <label htmlFor="review-ratings" className="mb-2 block text-xs">
                    RATING
                </label>

                <input
                    id="review-ratings"
                    name="ratings"
                    type="number"
                    min="1"
                    max="5"
                    step="0.1"
                    value={ratings}
                    onChange={(e) => setRatings(e.target.value)}
                    className={inputClass}
                    disabled={isSubmitting}
                />
            </div>

            <div>
                <label htmlFor="review-title" className="mb-2 block text-xs">
                    REVIEW
                </label>

                <textarea
                    id="review-title"
                    name="title"
                    rows="4"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={`${inputClass} w-full resize-none`}
                    placeholder="WRITE YOUR REVIEW"
                    disabled={isSubmitting}
                />
            </div>

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

            <div className="flex flex-wrap gap-3">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`${buttonClass} bg-[#8ec5ff] dark:bg-blue-700`}
                >
                    {isSubmitting ? "SAVING..." : submitLabel}
                </button>

                {onCancel ? (
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={isSubmitting}
                        className={`${buttonClass} bg-[#ff9aa2] dark:bg-red-700`}
                    >
                        CANCEL
                    </button>
                ) : null}
            </div>
        </form>
    );
};

export default ReviewForm;