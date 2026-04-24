const { z } = require("zod");
const { normalizeText } = require("../zUtils");

// @desc Brand zod schema validator
const zBrandSchema = z.strictObject({
    name: z
        .string("Brand name is required")
        .trim()
        .min(3, "At least 3 characters")
        .max(32, "At most 32 characters")
        .transform(normalizeText),
    description: z
        .string("Brand description is required")
        .trim()
        .min(4, "At least 4 characters"),
    image: z
        .string()
        .trim()
        .optional()
});

// @desc Create Brand zod schema validator
const zCreateBrandSchema = zBrandSchema;

// @desc Update Brand zod schema validator , all fields are optional()
const zUpdateBrandSchema = zBrandSchema.partial().refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update!",
    path: ["brand"]
});

module.exports = {
    zCreateBrandSchema,
    zUpdateBrandSchema
};