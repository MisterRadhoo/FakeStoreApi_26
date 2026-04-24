const { z } = require("zod");
const { normalizeText } = require("../zUtils");
const zObjectId = require("../zObjectId");

// @desc SubCategory zod schema validator
const zSubCategorySchema = z.strictObject({
    name: z.string("Name is required")
        .trim()
        .min(4, "At least 4 characters")
        .max(64, "At most 64 characters")
        .transform(normalizeText),
    categoryId: zObjectId
});

// @desc Create SubCategory zod schema validator
const zCreateSubCategorySchema = zSubCategorySchema;

// @desc Update SubCategory zod Schema validator
const zUpdateSubCategorySchema = zSubCategorySchema.partial().refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update!",
    path: ["subcategory"]
});

module.exports = {
    zCreateSubCategorySchema,
    zUpdateSubCategorySchema
};