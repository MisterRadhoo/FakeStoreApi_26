const { z } = require("zod");
const zObjectId = require("../zObjectId");

const idProductSchema = z.strictObject({
    id: zObjectId
});

module.exports = idProductSchema;