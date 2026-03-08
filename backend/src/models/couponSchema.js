const mongoose = require("mongoose");

// create couponSchema
const couponSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Cupon name is required"],
            trim: true,
            uppercase: true,
            unique: true,
        },
        expire: {
            type: Date,
            required: [true, "Expiration date is required"],
        },
        discount: {
            type: Number,
            required: [true, "Discount value is required"],
        },
    },
    {
        timestamps: true
    }
)

// create Coupon model from couponSchema
const Coupon = mongoose.model("Coupon", couponSchema);
module.exports = Coupon;