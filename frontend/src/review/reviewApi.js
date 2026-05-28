import axiosClient from "../config/api.js";

export const createReview = async (reviewData) => {
    const response = await axiosClient.post("/reviews", reviewData);
    return response.data;
};

export const updateReview = async ({ reviewId, reviewData }) => {
    const response = await axiosClient.patch(`/reviews/${reviewId}`, reviewData);
    return response.data;
};

export const deleteReview = async (reviewId) => {
    const response = await axiosClient.delete(`/reviews/${reviewId}`);
    return response.data;
};

export const getProductReviews = async ({ productId, page, limit }) => {
    const response = await axiosClient.get(`/products/${productId}/reviews/list`, {
        params: {
            page,
            limit
        }
    });

    return response.data;
};

// AI fake review detector
export const analyzeReviewAi = async (reviewId) => {
    const response = await axiosClient.post("/ai/review-analysis", {
        reviewId
    });
    return response.data.data;
};

// AI toxicity checker
export const getAllProductReviews = async () => {
    const response = await axiosClient.get("/reviews/all-products", {
        params: {
            page: 1,
            limit: 120
        }
    });

    return response.data;
};

// @desc Update Review toxicity status
export const updateReviewToxicityStatus = async (reviewId, toxicityStatus) => {
    const response = await axiosClient.patch(`/reviews/${reviewId}/toxicity-status`,
        toxicityStatus
    );

    return response.data;
};
