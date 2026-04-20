const { z } = require("zod");

// @desc Create TaxRate zod schema validator
const zTaxRatesListSchema = z.strictObject({
    country: z.string("Country is required").trim().min(3, "At least 3 characters").max(60, "At most 60 characters"),
    acronymCode: z.string("AcronymCode is required").trim().min(2, "At least 2 characters").max(3, "At most 3 characters").toUpperCase(),
    vatRate: z.coerce.number("Must be a number").min(0, "VAT rate must be >= 0.00").max(1, "VAT rate must be <= 1.00").optional(),
    shippingTaxRate: z.coerce.number("Must be a number").min(0, "Shipping tax must be >= 0").transform((value) => Math.round(value * 100) / 100).optional()
});

const zCreateTaxRateSchema = zTaxRatesListSchema;

// All the fields are optional(), but at least one must be provided for update
const zUpdateTaxRateSchema = zTaxRatesListSchema.partial()
    .refine((data) => Object.keys(data).length > 0, {
        message: "At least one field must be provided for update!",
        path: ["taxRate"]
    });

module.exports = {
    zCreateTaxRateSchema,
    zUpdateTaxRateSchema
};