const { z } = require("zod");
const zObjectId = require("../validators/zObjectId");

const zWishlistProductIdSchema = z.strictObject({
    productId: zObjectId
});

module.exports = zWishlistProductIdSchema;


