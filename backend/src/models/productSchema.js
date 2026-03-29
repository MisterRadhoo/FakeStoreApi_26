const mongoose = require("mongoose");

// create productSchema
const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      minlength: [4, "Title must be at least 4 characters"],
      maxlength: [120, "Title must be less than 120 characters"],
      trim: true,
      index: true
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
      minlength: [4, "Slug must be at least 4 characters"],
      maxlength: [120, "Slug must be less than 120 characters"],
      trim: true,
      lowercase: true,
      unique: true
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: 0,
      index: true,
    },
    currency: {
      type: String,
      enum: ["USD", "EUR", "RON"],
      default: "USD",
    },
    stock: {
      type: Number,
      required: [true, "Stock is required"],
      min: 0,
      index: true,
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
      minlength: [10, "Product description must be at least 10 characters"],
      trim: true,
    },
    // parent reference (many products to one category)
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true
    },
    // parent reference (many products to one subCategory)
    subcategoriesIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubCategory",
      }
    ],
    // parent reference (many products to one brand)
    brandId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
    },
    imageCover: {
      type: String,
      required: true,
      trim: true
    },
    images: [String],
    colors: [String],
    sold: {
      type: Number,
      default: 0,
    },
    ratingsAverage: {
      type: Number,
      min: [1, "Rating must be at least 1.0"],
      max: [5, "Rating must be less than or equal to 5.0"],
      set: v => Math.round(v * 100) / 100,
    },
    ratingsQuantity: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

productSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "productId",
});

//Mongoose Query middleware to populate Category in Product
productSchema.pre(/^find/, function () {
  this.populate({
    path: "categoryId",
    select: "name _id"
  });
  this.populate({
    "path": "subcategoriesIds",
    "select": "name _id"
  });
  this.populate({
    "path": "brandId",
    "select": "name _id description"
  });
});

// compound index for searching products after category and price,
productSchema.index({ categoryId: 1, price: 1 });
productSchema.index({ stock: 1, createdAt: -1 });

// create Product model from productSchema
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
