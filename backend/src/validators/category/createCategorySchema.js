const { z } = require("zod");

// Normalize text:  electrOniCs DeviCes to => Electronics devices...
const normalizeText = (value) => {
    const normalizedValue = value.trim().replace(/\s+/g, " ").toLowerCase();
    if (!normalizedValue) {
        return normalizedValue;
    }
    return normalizedValue.charAt(0).toUpperCase() + normalizedValue.slice(1);
};

// @desc Category zod schema validator
const zCategorySchema = z.object({
    name: z.string("Name is required").trim().min(4, "At least 4 characters").max(64, "At most 64 characters").transform(normalizeText),
    image: z.string("Image is required").trim()
}).strict();

// @desc  Create Category zod schema validator
const zCreateCategorySchema = zCategorySchema.strict();

// @desc Update Category zod schema validator
const zUpdateCategorySchema = zCategorySchema.strict();


module.exports = {
    zCreateCategorySchema,
    zUpdateCategorySchema
};