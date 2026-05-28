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

const getPredictionResult = (prediction) => {
    if (prediction.results && prediction.results[0]) {
        return prediction.results[0];
    }

    return null;
};

const getToxicScore = (prediction) => {
    const result = getPredictionResult(prediction);

    if (!result || !result.probabilities) {
        return 0;
    }

    return normalizeScore(result.probabilities[1]);
};

const buildCategoryResult = (prediction) => {
    const result = getPredictionResult(prediction);
    const score = getToxicScore(prediction);

    return {
        label: prediction.label,
        score,
        match: result ? result.match === true : false
    };
};

const getMatchedCategories = (categories) => {
    return categories.filter((category) => {
        return category.match;
    });
};

const getPrimaryCategory = (matchedCategories, categories) => {
    if (matchedCategories.length) {
        return matchedCategories[0];
    }

    return categories[0] || null;
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
            primaryCategory: "",
            categories: []
        };
    }

    const model = await loadToxicityModel();
    const predictions = await model.classify([reviewText]);

    const categories = predictions
        .map(buildCategoryResult)
        .sort((firstCategory, secondCategory) => {
            return secondCategory.score - firstCategory.score;
        });

    const matchedCategories = getMatchedCategories(categories);
    const primaryCategory = getPrimaryCategory(matchedCategories, categories);

    return {
        label: matchedCategories.length ? "Toxic" : "Clean",
        confidence: primaryCategory ? primaryCategory.score : 0,
        primaryCategory: matchedCategories.length && primaryCategory
            ? primaryCategory.label
            : "",
        categories
    };
};