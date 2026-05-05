const openai = require("./openAi");

const classifyReviewBehavior = async (payload) => {
    const response = await openai.responses.create({
        model: "gpt-5.5",
        input: [
            {
                role: "system",
                content: [
                    {
                        type: "input_text",
                        text:
                            "You are an AI classifier for e-commerce review behavior. " +
                            "Classify the event into exactly one of these labels: fakeReview or realReview. " +
                            "Map fakeReview to verdict bot and realReview to verdict human. " +
                            "Use both behavioral signals and review text. " +
                            "Return only valid JSON."
                    }
                ]
            },
            {
                role: "user",
                content: [
                    {
                        type: "input_text",
                        text: JSON.stringify({
                            actionType: payload.actionType,
                            selectedProductId: payload.selectedProductId,
                            checkedProductIds: payload.checkedProductIds,
                            productsCheckedCount: payload.productsCheckedCount,
                            loginDurationMs: payload.loginDurationMs,
                            typingDurationMs: payload.typingDurationMs,
                            submitActionDurationMs: payload.submitActionDurationMs,
                            sessionDurationMs: payload.sessionDurationMs,
                            scrollCount: payload.scrollCount,
                            reviewLength: payload.reviewLength,
                            wordCount: payload.wordCount,
                            rating: payload.rating,
                            reviewText: payload.reviewText,
                            result: payload.result,
                        })
                    }
                ]
            }
        ],
        text: {
            format: {
                type: "json_schema",
                strict: true,
                name: "review_behavior_classification",
                schema: {
                    type: "object",
                    additionalProperties: false,
                    properties: {
                        label: {
                            type: "string",
                            enum: ["fakeReview", "realReview"]
                        },
                        verdict: {
                            type: "string",
                            enum: ["bot", "human"]
                        },
                        riskScore: {
                            type: "number"
                        },
                        confidence: {
                            type: "string",
                            enum: ["low", "medium", "high"]
                        },
                        shortAnalysis: {
                            type: "string"
                        },
                        indicators: {
                            type: "array",
                            items: {
                                type: "string"
                            }
                        }
                    },
                    required: [
                        "label",
                        "verdict",
                        "riskScore",
                        "confidence",
                        "shortAnalysis",
                        "indicators"
                    ]
                }
            }
        }
    });

    return JSON.parse(response.output_text);
};

module.exports = {
    classifyReviewBehavior,
};