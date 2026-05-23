import { useState } from "react";
import { analyzeTextToxicity } from "../../AI/toxicityModel.js";

export const useReviewToxicity = () => {
    const [toxicityResults, setToxicityResults] = useState({});
    const [toxicityErrors, setToxicityErrors] = useState({});
    const [analyzingToxicityId, setAnalyzingToxicityId] = useState("");

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
            const result = await analyzeTextToxicity(review.title);

            setToxicityResults((currentResults) => ({
                ...currentResults,
                [review._id]: result
            }));
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
        analyzingToxicityId,
        handleAnalyzeToxicity
    };
};