const { z } = require("zod");

// @desc Coupon zod schema validator
const zCouponSchema = z.strictObject({
    name: z
        .string("Coupon name is required")
        .trim()
        .min(3, "At least 3 characters")
        .toUpperCase(),
    expire: z
        .coerce
        .date("Expiration date is required"),
    discount: z
        .coerce.number()
        .int("Discount must be an integer")
        .min(0, "Discount value must be >= 0")
        .max(50, "Discount value must be <= 50")
});


module.exports = zCouponSchema;