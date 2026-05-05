const { z } = require("zod");

const zCartUpdateQtySchema = z.strictObject({
    quantity: z.coerce.number()
        .int("Must be an integer")
        .min(1, "Quantity product must be >= 1")
});


const zApplyCouponSchema = z.strictObject({
    coupon: z
        .string("Coupon name is required")
        .trim()
        .min(3, "At least 3 characters")
        .toUpperCase()
});


module.exports = { zCartUpdateQtySchema, zApplyCouponSchema };


