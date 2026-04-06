const { z } = require("zod");
const { normalizeText } = require("../zUtils");

// @desc Brand zod schema validators
const zBrandSchema = z.object({
    name: z.string("Brand name is required")
        .trim()
        .min(3, "At least 3 characters")
        .max(32, "At most 32 characters")
        .transform(normalizeText),
    description: z.string("Brand description is required")
        .trim()
        .min(4, "At least 4 characters"),
    image: z.string("Brand image is required")
        .trim()
}).strict();


module.exports = zBrandSchema;