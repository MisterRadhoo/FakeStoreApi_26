const { z } = require("zod");

// @desc Update Review zod schema validator
const zUpdateReviewSchema = z.object({
    title: z.string()
        .trim()
        .min(3, "Review title must have at least 3 characters")
        .optional(),
    ratings: z.coerce
        .number()
        .min(1, "Rating expected number to be >= 1")
        .max(5, "Rating expected number to be <= 5")
        .transform((val) => Math.round(val * 100) / 100)
        .optional()
}).strict()
    .refine((data) => Object.keys(data).length > 0, {
        message: "At least one field  must be provided for update!",
        path: ["review"]
    });

module.exports = zUpdateReviewSchema;