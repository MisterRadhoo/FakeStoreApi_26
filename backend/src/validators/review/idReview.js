const { z } = require("zod");
const zObjectId = require("../zObjectId");

const idReviewSchema = z.object({
    id: zObjectId
});

module.exports = idReviewSchema;