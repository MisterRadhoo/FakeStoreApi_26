const { z } = require("zod");
const zObjectId = require("../zObjectId");

const idReviewSchema = z.strictObject({
    id: zObjectId
});

module.exports = idReviewSchema;