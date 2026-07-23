import "@tensorflow/tfjs";
import * as toxicity from "@tensorflow-models/toxicity";

// @desc Store the loaded toxicity model to avoid loading it multiple times
let toxicityModel = null;

// @desc Min. confidence required by the model to mark a category as matched
const TOXICITY_THRESHOLD = 0.75;

// @desc Ensures the input is always a valid string
const normalizeText = (text) => {
    return String(text || "");
};

// @desc Convert a value to a Number and keeps it between 0 and 1
const normalizeScore = (value) => {
    const numericValue = Number(value) || 0;

    return Math.min(Math.max(numericValue, 0), 1);
};

// @desc Get first prediction result for a toxicity category
const getPredictionResult = (prediction) => {
    if (prediction.results && prediction.results[0]) {
        return prediction.results[0];
    }

    return null;
};

// @desc Extract the toxic probability score from prediction
const getToxicScore = (prediction) => {
    const result = getPredictionResult(prediction);

    if (!result || !result.probabilities) {
        return 0;
    }

    return normalizeScore(result.probabilities[1]);
};

// @desc Builds a clean response object for one toxicity category
const buildCategoryResult = (prediction) => {
    const result = getPredictionResult(prediction);
    const score = getToxicScore(prediction);

    return {
        label: prediction.label,
        score,
        match: result ? result.match === true : false
    };
};

// @desc Return only the categories detected as toxic
const getMatchedCategories = (categories) => {
    return categories.filter((category) => {
        return category.match;
    });
};

// @desc Select the main toxicity category
const getPrimaryCategory = (matchedCategories, categories) => {
    if (matchedCategories.length) {
        return matchedCategories[0];
    }

    return categories[0] || null;
};

// @desc Load and caches the toxicity model
export const loadToxicityModel = async () => {
    if (toxicityModel) {
        return toxicityModel;
    }

    toxicityModel = await toxicity.load(TOXICITY_THRESHOLD);

    return toxicityModel;
};

// @desc Analyzezs a test and return the toxicity result
export const analyzeTextToxicity = async (text) => {
    const reviewText = normalizeText(text);

    // Return a clean result when the input text is empty
    if (!reviewText) {
        return {
            label: "Clean",
            confidence: 0,
            primaryCategory: "",
            categories: []
        };
    }

    //load the model, if reviewText exists
    const model = await loadToxicityModel();

    // Run toxicity classification on the review text
    const predictions = await model.classify([reviewText]);

    // Create the category list and sort descending by toxicity score
    const categories = predictions
        .map(buildCategoryResult)
        .sort((firstCategory, secondCategory) => {
            return secondCategory.score - firstCategory.score;
        });

    // Get detected toxic categories
    const matchedCategories = getMatchedCategories(categories);

    // Get primary category as toxic
    const primaryCategory = getPrimaryCategory(matchedCategories, categories);

    // Return the final toxicity analysis
    return {
        label: matchedCategories.length ? "Toxic" : "Clean",
        confidence: primaryCategory ? primaryCategory.score : 0,
        primaryCategory: matchedCategories.length && primaryCategory
            ? primaryCategory.label
            : "",
        categories
    };
};