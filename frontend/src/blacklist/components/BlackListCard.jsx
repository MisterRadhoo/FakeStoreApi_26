const labelStyles = {
    Bot: "border-red-900 bg-red-500 text-white shadow-[4px_4px_0_#7f1d1d]",
    Toxic: "border-orange-900 bg-orange-500 text-white shadow-[4px_4px_0_#9a3412]"
};

const defaultLabelStyle =
    "border-slate-900 bg-slate-500 text-white shadow-[4px_4px_0_#0f172a]";

const formatScore = (score) => {
    const numericScore = Number(score) || 0;

    return `${(numericScore * 100).toFixed(1)}%`;
};

const formatDate = (date) => {
    if (!date) {
        return "Unknown date";
    }

    return new Date(date).toLocaleString();
};

const getLabelStyle = (label) => {
    return labelStyles[label] || defaultLabelStyle;
};

const getUserName = (user) => {
    if (user && user.userName) {
        return user.userName;
    }

    return "Unknown user";
};

const getReviewRating = (review) => {
    if (review && review.ratings) {
        return review.ratings;
    }

    return "N/A";
};

const getReviewText = (item) => {
    if (item.reviewTextSnapshot) {
        return item.reviewTextSnapshot;
    }

    if (item.review && item.review.title) {
        return item.review.title;
    }

    return "No review text available";
};

const BlackListCard = ({ item }) => {
    const labelStyle = getLabelStyle(item.label);

    return (
        <article className="border-4 border-[#030712] bg-[#fff6cc] p-4 text-[#030712] shadow-[8px_8px_0_#030712] dark:border-white dark:bg-[#374151] dark:text-white dark:shadow-[8px_8px_0_#ffffff]">
            <div className="mb-4 flex flex-wrap items-start justify-between gap-4 border-b-4 border-[#030712] pb-3 dark:border-white">
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-[10px] leading-5">
                    <p>
                        USER:{" "}
                        <span className="text-red-600 dark:text-red-300">
                            {getUserName(item.user)}
                        </span>
                    </p>

                    <p>RATING: {getReviewRating(item.review)}</p>

                    <p>DETECTED: {formatDate(item.createdAt)}</p>
                </div>

                <span
                    className={`border-4 px-4 py-2 text-[10px] uppercase ${labelStyle}`}
                >
                    {item.label}
                </span>
            </div>

            <div className="mb-4 flex flex-wrap items-center gap-4 text-[10px] leading-6">
                <span
                    className={`border-4 px-4 py-2 uppercase ${labelStyle}`}
                >
                    AI SCORE: {formatScore(item.aiScore)}
                </span>

                <p>
                    <span className="text-red-600 dark:text-red-300">
                        REASON:
                    </span>{" "}
                    {item.reason || "No reason available"}
                </p>
            </div>

            <div className="border-t-4 border-[#030712] pt-3 text-[10px] leading-6 dark:border-white">
                <p className="mb-2 text-red-600 dark:text-red-300">
                    REVIEW SNAPSHOT
                </p>

                <p>
                    {getReviewText(item)}
                </p>
            </div>
        </article>
    );
};

export default BlackListCard;