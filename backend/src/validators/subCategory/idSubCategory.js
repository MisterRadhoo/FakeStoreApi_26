const { z } = require("zod");
const zObjectId = require("../zObjectId");

const idSubCategorySchema = z.strictObject({
    id: zObjectId
});

module.exports = idSubCategorySchema;