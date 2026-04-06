const { z } = require("zod");
const zObjectId = require("../zObjectId");

const idCategorySchema = z.strictObject({
    id: zObjectId
});

module.exports = idCategorySchema;