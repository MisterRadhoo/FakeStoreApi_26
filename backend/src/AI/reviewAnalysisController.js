const { runReviewAnalysis } = require("./reviewAnalysis");

// @desc Analyze Review document if is fake or real
const analyzeReview = async (req, res) => {
    const reviewDocument = await runReviewAnalysis(req.body.reviewId);

    return res.status(200).json({
        message: "AI prediction result!",
        data: reviewDocument
    });
};

module.exports = {
    analyzeReview
};