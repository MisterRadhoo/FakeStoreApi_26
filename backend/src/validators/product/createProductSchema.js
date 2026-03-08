const { z } = require("zod");
const zObjectId = require("../zObjectId");

const zCreateProductSchema = z.object({
    title: z.string().trim().min(3, "Title must have at least 3 characters").max(80, "Title must have at most 80 characters"),
    price: z.coerce.number().min(0, "Price must be >=0"),
    currency: z.enum(["USD", "EUR", "RON"]).optional(),
    stock: z.coerce.number().min(0, "Stock must be >=0"),
    description: z.string().trim().min(8),
    categoryId: zObjectId,
    subcategoriesIds: z.array(zObjectId).optional(),
    brandId: zObjectId.optional(),
    imageCover: z.string().trim().min(5),
    images: z.array(z.string().trim()).optional(),
    colors: z.array(z.string().trim()).optional(),
    sold: z.coerce.number().int().min(0).optional(),
    ratingsAverage: z.coerce.number().min(1).max(5).transform((val) => Math.round(val * 100) / 100).optional(),
    ratingsQuantity: z.coerce.number().int().min(0).optional(),
}).strict();

module.exports = zCreateProductSchema;



