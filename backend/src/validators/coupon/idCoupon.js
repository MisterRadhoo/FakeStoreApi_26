const { z } = require("zod");
const zObjectId = require("../zObjectId");

const idCouponSchema = z.strictObject({
    id: zObjectId
});

module.exports = idCouponSchema;