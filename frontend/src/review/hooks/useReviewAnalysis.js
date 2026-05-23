import { useState } from "react";
import { analyzeReviewAi } from "../reviewApi.js";
import { getReviewErrorMessage } from "../utils/reviewUtils.js";

export const useReviewAnalysis = () => {
    const [analysisResult, setAnalysisResult] = useState(null);
    const [analysisError, setAnalysisError] = useState("");
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const resetAnalysis = () => {
        setAnalysisResult(null);
        setAnalysisError("");
    };

    const handleAnalyzeReview = async (reviewId) => {
        if (!reviewId || isAnalyzing) {
            return;
        }

        setAnalysisResult(null);
        setAnalysisError("");
        setIsAnalyzing(true);

        try {
            const analysis = await analyzeReviewAi(reviewId);
            setAnalysisResult(analysis);
        } catch (error) {
            setAnalysisError(
                getReviewErrorMessage(error, "Review could not be analyzed.")
            );
        } finally {
            setIsAnalyzing(false);
        }
    };

    return {
        analysisResult,
        analysisError,
        isAnalyzing,
        resetAnalysis,
        handleAnalyzeReview
    };
};