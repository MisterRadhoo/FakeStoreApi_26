const { z } = require("zod");
const zObjectId = require("../validators/zObjectId");
const { normalizeText } = require("../validators/zUtils");

const idAddressSchema = z.strictObject({
    addressId: zObjectId
});


// @desc Address zod schema validators
const zAddressSchema = z.strictObject({
    details: z
        .string("Details are required")
        .trim()
        .min(3, "At least 3 characters")
        .max(35, "At most 35 characters"),
    country: z
        .string("Country is required")
        .trim()
        .min(3, "At least 3 characters")
        .max(15, "At most 15 characters")
        .transform(normalizeText),
    city: z
        .string("City is required")
        .trim()
        .min(3, "At least 3 characters")
        .max(15, "At most 15 characters")
        .transform(normalizeText),
    street: z
        .string("Street is required")
        .trim()
        .min(3, "At least 3 characters")
        .max(45, "At most 45 characters"),
    postalCode: z
        .string("PostalCode is required")
        .trim()
        .min(3, "At least 3 characters")
        .max(8, "At most 8 characters"),
    phone: z
        .string("Phone is required")
        .trim()
        .min(6, "At least 6 characters")
        .max(32, "At most 32 characters")
        .regex(/^[0-9+\-\s()]*$/, "Invalid phone number format")
});

module.exports = { zAddressSchema, idAddressSchema };