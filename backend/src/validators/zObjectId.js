const { z } = require("zod");
const mongoose = require("mongoose");

const zObjectId = z.string().refine(
    (value) => mongoose.Types.ObjectId.isValid(value),
    { message: "Invalid input type! Expected ObjectId type!" }
);

module.exports = zObjectId;