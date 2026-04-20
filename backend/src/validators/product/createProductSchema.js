const { z } = require("zod");
const zObjectId = require("../zObjectId");

// @desc Create Product zod schema validator
const zCreateProductSchema = z.strictObject({
    title: z
        .string("Title is required")
        .trim()
        .min(4, "At least 4 characters")
        .max(120, "At most 120 characters"),
    price: z
        .coerce
        .number("Must be a number")
        .min(0, "Price must be >= 0"),
    currency: z
        .enum(["USD", "EUR", "RON"])
        .optional(),
    stock: z
        .coerce
        .number("Must be a number")
        .int("Must be an integer")
        .min(0, "Stock must be >= 0"),
    description: z
        .string("Description is required")
        .trim()
        .min(10, "At least 10 characters"),
    categoryId: zObjectId,
    subcategoriesIds: z
        .array(zObjectId)
        .optional(),
    brandId: zObjectId
        .optional(),
    imageCover: z
        .string("imageCover is required")
        .trim()
        .min(5, "At least 5 characters"),
    images: z
        .array(z.string().trim()).optional(),
    colors: z
        .array(z.string().trim()).optional(),
    sold: z
        .coerce
        .number()
        .int()
        .min(0, "Sold must be >= 0").optional(),
    ratingsAverage: z
        .coerce
        .number()
        .min(1, "Expected number to be >= 1")
        .max(5, "Expected number to be <= 5")
        .transform((val) => Math.round(val * 100) / 100).optional(),
    ratingsQuantity: z
        .coerce
        .number()
        .int()
        .min(0, "Expected number to be >= 0").optional(),
});

module.exports = zCreateProductSchema;



