import { useEffect, useRef, useState } from "react";
import { analyzeTextToxicity } from "../../AI/toxicityModel.js";
import { updateReviewToxicityStatus } from "../reviewApi.js";

export const useReviewToxicity = () => {
    const [toxicityResults, setToxicityResults] = useState({});
    const [toxicityErrors, setToxicityErrors] = useState({});
    const [visibleToxicityDetails, setVisibleToxicityDetails] = useState({});
    const [analyzingToxicityId, setAnalyzingToxicityId] = useState("");

    const hideDetailsTimers = useRef({});

    const hideToxicityDetailsAfterDelay = (reviewId) => {
        if (hideDetailsTimers.current[reviewId]) {
            clearTimeout(hideDetailsTimers.current[reviewId]);
        }

        setVisibleToxicityDetails((currentDetails) => ({
            ...currentDetails,
            [reviewId]: true
        }));

        hideDetailsTimers.current[reviewId] = setTimeout(() => {
            setVisibleToxicityDetails((currentDetails) => ({
                ...currentDetails,
                [reviewId]: false
            }));

            delete hideDetailsTimers.current[reviewId];
        }, 10000);
    };

    useEffect(() => {
        return () => {
            Object.values(hideDetailsTimers.current).forEach((timerId) => {
                clearTimeout(timerId);
            });
        };
    }, []);

    const handleAnalyzeToxicity = async (review) => {
        if (!review || !review._id || analyzingToxicityId) {
            return;
        }

        setAnalyzingToxicityId(review._id);

        setToxicityResults((currentResults) => ({
            ...currentResults,
            [review._id]: null
        }));

        setToxicityErrors((currentErrors) => ({
            ...currentErrors,
            [review._id]: ""
        }));

        try {
            const toxicityResult = await analyzeTextToxicity(review.title);

            const response = await updateReviewToxicityStatus(
                review._id,
                toxicityResult
            );

            const savedToxicityStatus =
                response.data && response.data.toxicityStatus
                    ? response.data.toxicityStatus
                    : toxicityResult;

            setToxicityResults((currentResults) => ({
                ...currentResults,
                [review._id]: savedToxicityStatus
            }));

            hideToxicityDetailsAfterDelay(review._id);
        } catch (error) {
            console.error("Toxicity analysis error:", error);

            setToxicityErrors((currentErrors) => ({
                ...currentErrors,
                [review._id]: "Toxicity analysis failed."
            }));
        } finally {
            setAnalyzingToxicityId("");
        }
    };

    return {
        toxicityResults,
        toxicityErrors,
        visibleToxicityDetails,
        analyzingToxicityId,
        handleAnalyzeToxicity
    };
};