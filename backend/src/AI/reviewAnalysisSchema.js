const mongoose = require("mongoose");

const reviewAnalysisSchema = new mongoose.Schema(
    {
        reviewId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review",
            required: [true, "Review analysis must be associated with a review"]
        },
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: [true, "Review analysis must be associated with a product"]
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Review analysis must be associated with a user"]
        },
        reviewData: {
            text: {
                type: String,
                required: [true, "Review text is required"]
            },
            rating: {
                type: Number,
                required: [true, "Review rating is required"],
                min: 1,
                max: 5
            },
            reviewLength: {
                type: Number,
                required: [true, "Review length is required"],
                min: 0
            },
            wordCount: {
                type: Number,
                required: [true, "Word count is required"],
                min: 0
            }
        },
        aiAnalysis: {
            label: {
                type: String,
                enum: ["Fake", "Real"],
                required: [true, "AI label is required"]
            },
            confidence: {
                type: Number,
                required: [true, "AI confidence is required"],
                min: 0,
                max: 1
            },
            processingTimeMs: {
                type: Number,
                required: [true, "Processing time is required"],
                min: 0
            },
            modelName: {
                type: String,
                required: [true, "Model name is required"]
            },
            scores: [
                {
                    _id: false,
                    label: {
                        type: String,
                        enum: ["Fake", "Real"],
                        required: [true, "Score label is required"]
                    },
                    score: {
                        type: Number,
                        required: [true, "Score value is required"],
                        min: 0,
                        max: 1
                    }
                }
            ]
        }
    },
    {
        timestamps: true
    }
);

const ReviewAnalysis = mongoose.model("ReviewAnalysis", reviewAnalysisSchema);
module.exports = ReviewAnalysis;

