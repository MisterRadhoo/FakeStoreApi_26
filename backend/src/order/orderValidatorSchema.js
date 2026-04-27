const { z } = require("zod");
const zObjectId = require("../validators/zObjectId");
const { normalizeText } = require("../validators/zUtils");

// @desc shippingAddress zod schema validator
const zShippingAddressSchema = z.strictObject({
    details: z
        .string()
        .trim()
        .min(3, "At least 3 characters")
        .max(35, "At most 35 characters")
        .optional(),
    country: z
        .string("Country is required")
        .trim()
        .min(3, "At least 3 characters")
        .max(15, "At most 15 characters")
        .transform(normalizeText),
    city: z
        .string()
        .trim()
        .min(3, "At least 3 characters")
        .max(15, "At most 15 characters")
        .transform(normalizeText)
        .optional(),
    street: z
        .string()
        .trim()
        .min(3, "At least 3 characters")
        .max(45, "At most 45 characters")
        .optional(),
    postalCode: z
        .string()
        .trim()
        .min(3, "At least 3 characters")
        .max(8, "At most 8 characters")
        .optional(),
    phone: z
        .string()
        .trim()
        .min(6, "At least 6 characters")
        .max(32, "At most 32 characters")
        .regex(/^[0-9+\-\s()]*$/, "Invalid phone number format")
        .optional()
});

// @desc idOrder zod schema validator
const idOrderSchema = z.strictObject({
    id: zObjectId
});

// @desc Create Order zod schema validator
const zCreateOrderSchema = z.strictObject({
    addressId: zObjectId.optional(),
    shippingAddress: zShippingAddressSchema.optional()
}).refine((data) => data.addressId || data.shippingAddress, {
    message: "AddressId or shippingAddress is required",
    path: ["shippingAddress"]
});


module.exports = {
    zCreateOrderSchema,
    idOrderSchema
};