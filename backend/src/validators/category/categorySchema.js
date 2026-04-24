const { z } = require("zod");
const { normalizeText } = require("../zUtils");

// @desc Category zod schema validator
const zCategorySchema = z.strictObject({
    name: z.string("Name is required")
        .trim()
        .min(4, "At least 4 characters")
        .max(64, "At most 64 characters")
        .transform(normalizeText),
    image: z.string()
        .trim()
        .optional()
});

// @desc Create Category zod schema validator
const zCreateCategorySchema = zCategorySchema;

// @desc Update Category zod schema validator
const zUpdateCategorySchema = zCategorySchema.partial().refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update!",
    path: ["category"]
});

module.exports = {
    zCreateCategorySchema,
    zUpdateCategorySchema
};