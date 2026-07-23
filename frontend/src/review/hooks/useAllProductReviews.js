import { useEffect, useState } from "react";
import { getAllProductReviews } from "../reviewApi.js";
import { getErrorMessage } from "../../utils/utils.js";

const initialPagination = {
    page: 1,
    limit: 4,
    sort: "-createdAt",
    count: 0,
    totalReviews: 0,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false
};

export const useAllProductReviews = () => {
    const [reviews, setReviews] = useState([]);
    const [pagination, setPagination] = useState(initialPagination);
    const [isLoadingReviews, setIsLoadingReviews] = useState(true);
    const [reviewsError, setReviewsError] = useState("");

    const loadAllProductReviews = async (page = pagination.page) => {
        setIsLoadingReviews(true);
        setReviewsError("");

        try {
            const response = await getAllProductReviews({
                page,
                limit: pagination.limit,
                sort: pagination.sort
            });

            setReviews(response.list || []);

            setPagination({
                page: response.page,
                limit: response.limit,
                sort: response.sort,
                count: response.count,
                totalReviews: response.totalReviews,
                totalPages: response.totalPages,
                hasNextPage: response.hasNextPage,
                hasPrevPage: response.hasPrevPage
            });
        } catch (error) {
            setReviews([]);
            setReviewsError(getErrorMessage(error, "Reviews could not be loaded."));
        } finally {
            setIsLoadingReviews(false);
        }
    };

    const goToNextPage = () => {
        if (pagination.hasNextPage) {
            loadAllProductReviews(pagination.page + 1);
        }
    };

    const goToPrevPage = () => {
        if (pagination.hasPrevPage) {
            loadAllProductReviews(pagination.page - 1);
        }
    };

    useEffect(() => {
        loadAllProductReviews(1);
    }, []);

    return {
        reviews,
        pagination,
        isLoadingReviews,
        reviewsError,
        loadAllProductReviews,
        goToNextPage,
        goToPrevPage
    };
};