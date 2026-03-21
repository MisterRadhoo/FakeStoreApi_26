const { z } = require("zod");
const zObjectId = require("../zObjectId");

const idTaxRateSchema = z.object({
    id: zObjectId
}).strict();

module.exports = idTaxRateSchema;
