// @desc Get Review date label
export const getReviewDateLabel = (review) => {
    if (!review || !review.createdAt) {
        return "";
    }

    const createdDate = new Date(review.createdAt);
    const updatedDate = review.updatedAt
        ? new Date(review.updatedAt)
        : createdDate;

    const isEdited = updatedDate.getTime() > createdDate.getTime();
    const displayDate = isEdited ? updatedDate : createdDate;

    const formattedDate = displayDate.toLocaleString("ro-RO", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
    });

    return isEdited
        ? `EDITED: ${formattedDate}`
        : `CREATED: ${formattedDate}`;
};