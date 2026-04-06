const { z } = require("zod");
const zObjectId = require("../zObjectId");

const idTaxRateSchema = z.strictObject({
    id: zObjectId
});

module.exports = idTaxRateSchema;
