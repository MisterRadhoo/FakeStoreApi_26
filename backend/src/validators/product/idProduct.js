const { z } = require("zod");
const zObjectId = require("../zObjectId");

const idProductSchema = z.object({
    id: zObjectId
});

module.exports = idProductSchema;