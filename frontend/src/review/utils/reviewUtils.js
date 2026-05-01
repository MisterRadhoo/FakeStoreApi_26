// @desc Get Review product by userId
export const getReviewUserId = (review) => {
    if (!review || !review.userId) {
        return "";
    }

    if (
        typeof review.userId === "object" &&
        (review.userId._id || review.userId.id)
    ) {
        return String(review.userId._id || review.userId.id);
    }

    return String(review.userId);
};

// @desc Error helper for ReviewSection.jsx
export const getReviewErrorMessage = (error, fallbackMessage) => {
    if (
        error &&
        error.response &&
        error.response.data &&
        error.response.data.details &&
        error.response.data.details.issues &&
        error.response.data.details.issues.length > 0 &&
        error.response.data.details.issues[0].message
    ) {
        return error.response.data.details.issues[0].message;
    }

    if (
        error &&
        error.response &&
        error.response.data &&
        error.response.data.message
    ) {
        return error.response.data.message;
    }

    return fallbackMessage;
};