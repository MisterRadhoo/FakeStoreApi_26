const axios = require("axios");
const CustomApiError = require("../utils/ApiError");
const { Review, ReviewAnalysis } = require("../models/index");
const { addBlackListLabel } = require("../services/blackList");

const AI_SERVICE_URL = process.env.AI_SERVICE_URL || "http://127.0.0.1:8000";
const AI_MODEL_NAME = process.env.AI_MODEL_NAME || "fake-review-distilbert-en";

// @desc Get fakeScore from aiAnalysis
const getFakeScore = (aiAnalysis) => {
    const fakeScore = aiAnalysis.scores.find((score) => {
        return score.label === "Fake";
    });

    if (fakeScore) {
        return fakeScore.score;
    }

    return aiAnalysis.confidence;
};

const addBotLabelIfFakeReview = async (review, reviewData, aiAnalysis) => {
    if (aiAnalysis.label !== "Fake") {
        return null;
    }

    return addBlackListLabel({
        userId: review.userId,
        reviewId: review._id,
        label: "Bot",
        reason: "Fake review detected by AI",
        aiScore: getFakeScore(aiAnalysis),
        reviewTextSnapshot: reviewData.text
    });
};


// @desc Count words from review text
const getWordCount = (text) => {
    return text.split(/\s+/).filter(Boolean).length;
};

// @desc Call python FastAPI AI service
const analyzeReviewByAi = async (reviewText) => {
    const response = await axios.post(
        `${AI_SERVICE_URL}/api/predict`,
        {
            reviewText
        }
    ).catch(() => {
        throw CustomApiError.serviceUnavailable("AI service unavailable!", "ai");
    });

    return response.data;
};

// @desc Get review from db for analysis
const getReviewForAnalysis = async (reviewId) => {
    const review = await Review.findById(reviewId).select(
        "title ratings productId userId"
    );

    if (!review) {
        throw CustomApiError.notFound(`Review with id: ${reviewId}`, "reviewId");
    }

    return review;
};

// @desc Build review data from existing review
const buildReviewDataFromReview = (review) => {
    return {
        text: review.title,
        rating: review.ratings,
        reviewLength: review.title.length,
        wordCount: getWordCount(review.title)
    };
};

// @desc Build AI analysis data from Python response
const buildAiAnalysisFromResult = (aiResult) => {
    return {
        label: aiResult.prediction,
        confidence: aiResult.confidence,
        processingTimeMs: aiResult.processingTimeMs,
        modelName: AI_MODEL_NAME,
        scores: [
            {
                label: "Real",
                score: aiResult.realProbability
            },
            {
                label: "Fake",
                score: aiResult.fakeProbability
            }
        ]
    };
};

// @desc Save or update analysis in db and update review AI badge
const saveReviewAnalysis = async (review, reviewData, aiAnalysis) => {
    const reviewAnalysis = await ReviewAnalysis.findOneAndUpdate(
        {
            reviewId: review._id
        },
        {
            reviewId: review._id,
            productId: review.productId,
            userId: review.userId,
            reviewData,
            aiAnalysis
        },
        {
            new: true,
            upsert: true,
            runValidators: true
        }
    );

    await Review.updateOne(
        {
            _id: review._id
        },
        {
            $set: {
                aiStatus: {
                    label: aiAnalysis.label,
                    confidence: aiAnalysis.confidence,
                    analyzedAt: new Date()
                }
            }
        },
        {
            runValidators: true,
            timestamps: false
        }
    );

    // AI Fake review detector === Fake --> label === Bot for blackListed users
    await addBotLabelIfFakeReview(review, reviewData, aiAnalysis);

    return reviewAnalysis;
};

// @desc Full flow: get review -> call Python -> save analysis
const runReviewAnalysis = async (reviewId) => {
    const review = await getReviewForAnalysis(reviewId);

    const reviewData = buildReviewDataFromReview(review);

    const aiResult = await analyzeReviewByAi(reviewData.text);

    const aiAnalysis = buildAiAnalysisFromResult(aiResult);

    return saveReviewAnalysis(review, reviewData, aiAnalysis);
};

module.exports = {
    analyzeReviewByAi,
    getReviewForAnalysis,
    buildReviewDataFromReview,
    buildAiAnalysisFromResult,
    saveReviewAnalysis,
    runReviewAnalysis
};