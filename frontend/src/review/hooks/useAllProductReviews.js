import { useEffect, useState } from "react";
import { getAllProductReviews } from "../reviewApi.js";
import { getErrorMessage } from "../../utils/utils.js";

export const useAllProductReviews = () => {
    const [reviews, setReviews] = useState([]);
    const [isLoadingReviews, setIsLoadingReviews] = useState(true);
    const [reviewsError, setReviewsError] = useState("");

    const loadAllProductReviews = async () => {
        setIsLoadingReviews(true);
        setReviewsError("");

        try {
            const response = await getAllProductReviews();
            setReviews(response.list || []);
        } catch (error) {
            setReviews([]);
            setReviewsError(getErrorMessage(error, "Reviews could not be loaded."));
        } finally {
            setIsLoadingReviews(false);
        }
    };

    useEffect(() => {
        loadAllProductReviews();
    }, []);

    return {
        reviews,
        isLoadingReviews,
        reviewsError,
        loadAllProductReviews
    };
};