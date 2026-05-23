const { z } = require("zod");
const zObjectId = require("../validators/zObjectId");

const reviewIdSchema = z.strictObject({
    reviewId: zObjectId
});

module.exports = reviewIdSchema;