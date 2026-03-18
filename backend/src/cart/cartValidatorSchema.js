const { z } = require("zod");

const zCartUpdateQtySchema = z.object({
    quantity: z.coerce.number()
        .int("Must be an integer")
        .min(1, "Quantity product must be >= 1")
}).strict();

module.exports = zCartUpdateQtySchema;