const { z } = require("zod");
const zObjectId = require("../zObjectId");

// @desc Update Product zod schema validator
const zUpdateProductSchema = z.strictObject({
    title: z.string().trim().min(4, "At least 4 characters").max(120, "At most 120 characters").optional(),
    price: z.coerce.number().min(0, "Price must be >= 0").optional(),
    currency: z.enum(["USD", "EUR", "RON"]).optional(),
    stock: z.coerce.number().int("Must be an integer").min(0, "Stock must be >= 0").optional(),
    description: z.string().trim().min(10, "At least 10 characters").optional(),
    categoryId: zObjectId.optional(),
    subcategoriesIds: z.array(zObjectId).optional(),
    brandId: zObjectId.optional(),
    imageCover: z.string().trim().min(5, "At least 5 characters").optional(),
    images: z.array(z.string().trim()).optional(),
    colors: z.array(z.string().trim()).optional(),
    sold: z.coerce.number().int().min(0, "Sold must be >= 0").optional(),
    ratingsAverage: z.coerce.number().min(1, "Expected number to be >= 1").max(5, "Expected number to be <= 5").transform((val) => Math.round(val * 100) / 100).optional(),
    ratingsQuantity: z.coerce.number().int().min(0, "Expected number to be >= 0").optional(),
}).refine((data) => Object.keys(data).length >= 1, {
    message: "At least 1 fields must be provided for update!",
    path: ["product"]
});

module.exports = zUpdateProductSchema;



