const { z } = require("zod");
const zObjectId = require("../zObjectId");

const idCategorySchema = z.object({
    id: zObjectId
}).strict();

module.exports = idCategorySchema;