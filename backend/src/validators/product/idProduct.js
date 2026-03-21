const { z } = require("zod");
const zObjectId = require("../zObjectId");

const idProductSchema = z.object({
    id: zObjectId
}).strict();

module.exports = idProductSchema;