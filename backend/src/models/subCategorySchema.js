const mongoose = require("mongoose");

// create subCategorySchema
const subCategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Subcategory name is required"],
            minlength: [4, "Subcategory name must be at least 4 characters"],
            maxlength: [64, "Subcategory name must be less than 64 characters"],
            trim: true,
            index: true
        },
        slug: {
            type: String,
            trim: true,
            required: [true, "Subcategory slug is required"],
            minlength: [4, "Subcategory slug must be at least 4 characters"],
            maxlength: [64, "Subcategory slug must be less than 64 characters"],
            lowercase: true,
            unique: true
        },
        // parent reference (one category to many subCategories)
        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        }
    },
    {
        timestamps: true
    }
);

// create SubCategory model from subCategorySchema
const SubCategory = mongoose.model("SubCategory", subCategorySchema);
module.exports = SubCategory;
