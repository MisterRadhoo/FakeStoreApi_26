const { classifyReviewBehavior } = require("./AIservice");

const classifyReviewBehaviorController = async (req, res) => {
    const data = await classifyReviewBehavior(req.body);

    res.status(200).json({
        message: "AI analysis completed",
        data: data
    });
};

module.exports = classifyReviewBehaviorController;