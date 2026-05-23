import "@tensorflow/tfjs";
import * as toxicity from "@tensorflow-models/toxicity";

let toxicityModel = null;

const TOXICITY_THRESHOLD = 0.75;

const normalizeText = (text) => {
    return String(text || "");
};

const normalizeScore = (value) => {
    const numericValue = Number(value) || 0;
    return Math.min(Math.max(numericValue, 0), 1);
};

const getToxicScore = (prediction) => {
    const result = prediction.results && prediction.results[0]
        ? prediction.results[0]
        : null;

    if (!result || !result.probabilities) {
        return 0;
    }

    return normalizeScore(result.probabilities[1]);
};

const buildCategoryResult = (prediction) => {
    const score = getToxicScore(prediction);

    return {
        label: prediction.label,
        score,
        match: score >= TOXICITY_THRESHOLD
    };
};

const getStrongestCategory = (categories) => {
    return categories.reduce((currentMax, category) => {
        if (!currentMax || category.score > currentMax.score) {
            return category;
        }

        return currentMax;
    }, null);
};

export const loadToxicityModel = async () => {
    if (toxicityModel) {
        return toxicityModel;
    }

    toxicityModel = await toxicity.load(TOXICITY_THRESHOLD);
    return toxicityModel;
};

export const analyzeTextToxicity = async (text) => {
    const reviewText = normalizeText(text);

    if (!reviewText) {
        return {
            label: "Clean",
            confidence: 0,
            categories: []
        };
    }

    const model = await loadToxicityModel();
    const predictions = await model.classify([reviewText]);

    const categories = predictions.map(buildCategoryResult);
    const strongestCategory = getStrongestCategory(categories);

    const isToxic = categories.some((category) => category.match);

    return {
        label: isToxic ? "Toxic" : "Clean",
        confidence: strongestCategory ? strongestCategory.score : 0,
        categories
    };
};