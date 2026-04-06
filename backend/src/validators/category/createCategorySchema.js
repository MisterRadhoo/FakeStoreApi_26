const { z } = require("zod");
const { normalizeText } = require("../zUtils");

// @desc Category zod schema validator
const zCategorySchema = z.object({
    name: z.string("Name is required")
        .trim()
        .min(4, "At least 4 characters")
        .max(64, "At most 64 characters")
        .transform(normalizeText),
    image: z.string("Image is required")
        .trim()
}).strict();

// @desc  Create Category zod schema validator
const zCreateCategorySchema = zCategorySchema.strict();

// @desc Update Category zod schema validator
const zUpdateCategorySchema = zCategorySchema.strict();


module.exports = {
    zCreateCategorySchema,
    zUpdateCategorySchema
};