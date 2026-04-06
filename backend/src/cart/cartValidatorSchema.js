const { z } = require("zod");

const zCartUpdateQtySchema = z.strictObject({
    quantity: z.coerce.number()
        .int("Must be an integer")
        .min(1, "Quantity product must be >= 1")
});

module.exports = zCartUpdateQtySchema;