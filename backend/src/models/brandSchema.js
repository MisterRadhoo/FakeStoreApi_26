const mongoose = require("mongoose");

// create brandSchema
const brandSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Brand name is required"],
            minlength: [3, "Brand name must be at least 3 characters"],
            maxlength: [32, "Brand name must be at most 32 characters"],
            trim: true,
            unique: true,
        },
        description: {
            type: String,
            required: [true, "Brand description is required"],
            minlength: [4, "Brand description must be at least 4 characters"],
            trim: true,
        },
        image: String,
    },
    {
        timestamps: true
    }
);

// create Brand model from brandSchema
const Brand = mongoose.model("Brand", brandSchema);
module.exports = Brand;