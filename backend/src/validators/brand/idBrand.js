const { z } = require("zod");
const zObjectId = require("../zObjectId");

const idBrandSchema = z.object({
    id: zObjectId
}).strict();

module.exports = idBrandSchema;