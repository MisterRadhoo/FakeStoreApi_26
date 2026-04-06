const { z } = require("zod");
const zObjectId = require("../zObjectId");

// @desc Create Review zod schema validator
const zCreateReviewSchema = z.strictObject({
    title: z.string()
        .trim()
        .min(3, "Review title must have at least 3 characters"),
    ratings: z.coerce
        .number()
        .min(1, "Rating expected number to be >= 1")
        .max(5, "Rating expected number to be <= 5")
        .transform((val) => Math.round(val * 100) / 100),
    userId: zObjectId,
    productId: zObjectId,
});

module.exports = zCreateReviewSchema;