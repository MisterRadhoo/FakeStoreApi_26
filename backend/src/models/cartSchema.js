const mongoose = require("mongoose");

// create cartSchema
const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Cart must be associated with a user."],
    },
    // subdocuments for cart items (embedded array)
    cartItems: [
      {
        _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true
        },
        title: {
          type: String,
          required: true,
          trim: true
        },
        imageCover: {
          type: String,
          required: true
        },
        // quantity of the product in cart
        quantity: {
          type: Number,
          default: 1,
          min: 1
        },
        //price product at the time of adding to cart
        price: {
          type: Number,
          required: true,
          min: 0
        }
      },
    ],
    couponId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Coupon"
    },
    totalCartPrice: {
      type: Number,
      default: 0,
      min: 0,
    },
    totalPriceAfterDiscount: {
      type: Number,
      default: 0,
      min: 0
    },
    currency: {
      type: String,
      enum: ["USD", "EUR", "RON"],
      default: "USD",
    },
    status: {
      type: String,
      enum: ["active", "inactive", "completed"],
      default: "active"
    },
    lastActionAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// unique index to ensure one active cart per user
cartSchema.index({ userId: 1, status: 1 }, { unique: true, partialFilterExpression: { status: "active" } });
cartSchema.index({ userId: 1, createdAt: -1 }); // query recent carts for user
cartSchema.index({ status: 1, lastActionAt: -1 }); // query carts by status and recent activity

// create Cart Model from cartSchema
const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;