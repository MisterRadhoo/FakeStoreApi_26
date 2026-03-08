const mongoose = require("mongoose");

// creating categorySchema
const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name of category is required"],
            minlength: [4, "Name of category must be at least 4 characters"],
            maxlength: [64, "Name of category must be less than 64 characters"],
            trim: true,
            index: true
        },
        slug: {
            type: String,
            required: [true, "Slug category is required"],
            minlength: [4, "Slug must be at least 4 characters"],
            maxlength: [64, "Slug must be less than 64 characters"],
            trim: true,
            lowercase: true,
            unique: true,
        },
        image: String,
    },
    {
        timestamps: true,
    }
);


// creating Category model from categorySchema
const Category = mongoose.model("Category", categorySchema);
module.exports = Category;