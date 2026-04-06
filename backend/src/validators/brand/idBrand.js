const { z } = require("zod");
const zObjectId = require("../zObjectId");

const idBrandSchema = z.strictObject({
    id: zObjectId
});

module.exports = idBrandSchema;