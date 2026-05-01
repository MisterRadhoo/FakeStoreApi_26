const { z } = require("zod");
const zObjectId = require("./zObjectId");

// @desc ApiFeatures zod schema validator
const zApiFeatures = z.strictObject({
    page: z.coerce
        .number()
        .int("Page must be an integer")
        .min(1, "Page must be >= 1")
        .optional()
        .default(1),
    limit: z.coerce
        .number()
        .int("Limit must be an integer")
        .min(1, "Limit must be >= 1")
        .max(85, "Limit must be <= 85")
        .optional()
        .default(81),
    sortedBy: z.string()
        .trim()
        .optional()
        .default("-price"),
    fields: z.string()
        .trim()
        .optional()
        .default("-__v -images -createdAt -updatedAt"),
    keyword: z.string()
        .trim()
        .min(2, "Keyword must be at least 2 characters")
        .optional(),
    categoryId: zObjectId.optional(),  // used in front-end when filter product by category
    brandId: zObjectId.optional(), // used in front-end when filter product by brand

    price: z.union([
        z.coerce.number().min(0, "Price must be >= 0"),

        z.strictObject({
            gte: z.coerce.number().min(0, "Price gte must be >= 0").optional(),
            gt: z.coerce.number().min(0, "Price gt must be >= 0").optional(),
            lte: z.coerce.number().min(0, "Price lte must be >= 0").optional(),
            lt: z.coerce.number().min(0, "Price lt must be >= 0").optional()
        })
    ]).optional(),
    ratingsAverage: z.union([
        z.coerce.number()
            .min(1, "ratingsAverage must be >= 1")
            .max(5, "ratingsAverage must be <= 5"),

        z.strictObject({
            gte: z.coerce.number().min(1, "ratingsAverage gte must be >= 1").max(5, "ratingsAverage gte must be <= 5").optional(),
            gt: z.coerce.number().min(1, "ratingsAverage gt must be >= 1").max(5, "ratingsAverage gt must be <= 5").optional(),
            lte: z.coerce.number().min(1, "ratingsAverage lte must be >= 1").max(5, "ratingsAverage lte must be <= 5").optional(),
            lt: z.coerce.number().min(1, "ratingsAverage lt must be >= 1").max(5, "ratingsAverage lt must be <= 5").optional()
        })
    ]).optional(),
    // taxRatesListSchema fields
    vatRate: z.union([
        z.coerce.number()
            .min(0, "vatRate must be >= 0")
            .max(1, "vatRate must be <= 1"),

        z.strictObject({
            gte: z.coerce.number().min(0, "vatRate gte must be >= 0").max(1, "vatRate gte must be <= 1").optional(),
            gt: z.coerce.number().min(0, "vatRate gt must be >= 0").max(1, "vatRate gt must be <= 1").optional(),
            lte: z.coerce.number().min(0, "vatRate lte must be >= 0").max(1, "vatRate lte must be <= 1").optional(),
            lt: z.coerce.number().min(0, "vatRate lt must be >= 0").max(1, "vatRate lt must be <= 1").optional()
        })
    ]).optional(),
    shippingTaxRate: z.union([
        z.coerce.number()
            .min(0, "shippingTaxRate must be >= 0"),

        z.strictObject({
            gte: z.coerce.number().min(0, "shippingTaxRate gte must be >= 0").optional(),
            gt: z.coerce.number().min(0, "shippingTaxRate gt must be >= 0").optional(),
            lte: z.coerce.number().min(0, "shippingTaxRate lte must be >= 0").optional(),
            lt: z.coerce.number().min(0, "shippingTaxRate lt must be >= 0").optional()
        })
    ]).optional(),
    // reviewSchema field
    ratings: z.union([
        z.coerce.number()
            .min(1, "Ratings must be >= 1")
            .max(5, "Ratings must be <= 5"),

        z.strictObject({
            gte: z.coerce.number().min(1, "Ratings gte must be >= 1").max(5, "Ratings gte must be <= 5").optional(),
            gt: z.coerce.number().min(1, "Ratings gt must be >= 1").max(5, "Ratings gt must be <= 5").optional(),
            lte: z.coerce.number().min(1, "Ratings lte must be >= 1").max(5, "Ratings lte must be <= 5").optional(),
            lt: z.coerce.number().min(1, "Ratings lt must be >= 1").max(5, "Ratings lt must be <= 5").optional()
        })
    ]).optional()
});


module.exports = zApiFeatures;