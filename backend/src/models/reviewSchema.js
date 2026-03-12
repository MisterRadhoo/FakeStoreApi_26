const mongoose = require("mongoose");
const Product = require("./productSchema");

// create reviewSchema
const reviewSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Review title is required"],
            trim: true,
            index: true,
        },
        ratings: {
            type: Number,
            required: [true, "Rating is required"],
            min: 1,
            max: 5,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Review must be associated with a user"],
        },
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: [true, "Review must belong to a product"],
        },
    },
    {
        timestamps: true,
    }
);

reviewSchema.pre(/^find/, function () {
    this.populate({ path: "userId", select: "userName _id" });
});

reviewSchema.statics.calculateAverageRatingsAndQuantity = async function (productId) {
    const stats = await this.aggregate([
        {
            // Phase 1: Get reviews for the specified product
            $match: { productId }
        },
        {
            // Phase 2: Group reviews to calculate average ratings
            $group: {
                _id: "$productId",
                averageRatings: { $avg: "$ratings" },
                ratingsQuantity: { $sum: 1 }
            }
        }
    ]);

    if (stats.length > 0) {
        await Product.findByIdAndUpdate(productId, {
            ratingsAverage: stats[0].averageRatings,
            ratingsQuantity: stats[0].ratingsQuantity,
        })
    } else {
        await Product.findByIdAndUpdate(productId, {
            $unset: { ratingsAverage: 1 },
            ratingsQuantity: 0
        });
    }
};

// create review - calculate ratings
reviewSchema.post("save", async function () {
    // 'this' points to the current review
    await this.constructor.calculateAverageRatingsAndQuantity(this.productId);
});
//update review - calculate ratings
reviewSchema.post("findOneAndUpdate", async function (document) {
    if (!document) return;
    await document.constructor.calculateAverageRatingsAndQuantity(document.productId);

});
//delete review - calculate ratings
reviewSchema.post("findOneAndDelete", async function (document) {
    if (!document) return;
    await document.constructor.calculateAverageRatingsAndQuantity(document.productId);
});

// create Review model from reviewSchema
const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;