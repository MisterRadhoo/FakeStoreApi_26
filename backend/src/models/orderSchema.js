const mongoose = require("mongoose");

// create orderSchema
const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Order must be associated with a user."],
    },
    cartId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cart",
      required: [true, "Order must be associated with a shopping cart."],
    },
    orderItems: [
      {
        _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        title: {
          type: String,
          required: true,
          trim: true
        },
        imageCover: {
          type: String,
          required: true,
          trim: true
        },
        quantity: {
          type: Number,
          required: true,
          min: 1
        },
        price: {
          type: Number,
          required: true,
          min: 0
        },
      }
    ],
    taxPrice: {
      type: Number,
      default: 0,
      min: 0,
    },
    shippingAddress: {
      type: {
        details: {
          type: String,
          maxlength: 35,
          trim: true,
        },
        country: {
          type: String,
          maxlength: 15,
          trim: true
        },
        city: {
          type: String,
          maxlength: 15,
          trim: true,
        },
        street: {
          type: String,
          maxlength: 45,
          trim: true,
        },
        postalCode: {
          type: String,
          maxlength: 8,
          trim: true,
        },
        phone: {
          type: String,
          minlength: 6,
          maxlength: 32,
          trim: true,
        },
      },
      required: true
    },
    shippingPrice: {
      type: Number,
      default: 0,
      min: 0,
    },
    totalOrderPrice: {
      type: Number,
      default: 0,
      min: 0,
    },
    currency: {
      type: String,
      enum: ["USD", "EUR", "RON"],
      default: "USD",
    },
    status: {
      type: String,
      enum: ["pending", "processing", "completed", "cancelled", "failed"],
      default: "pending",
    },
    paymentMethodType: {
      type: String,
      enum: ["credit_card", "cash_on_delivery", "paypal", "bank_transfer"],
      default: "credit_card",
    },
    isPaid: {
      type: Boolean,
      default: false
    },
    paidAt: {
      type: Date,
      default: undefined
    },
    isDelivered: {
      type: Boolean,
      default: false,
    },
    deliveredAt: {
      type: Date,
      default: undefined,
    },
  },
  {
    timestamps: true,
  }
);

// indexes for optimizing queries
orderSchema.index({ userId: 1, createdAt: -1 });
orderSchema.index({ status: 1, createdAt: -1 });
orderSchema.index({ cartId: 1 }); // associated with a Cart

// create Order model from orderSchema
const Order = mongoose.model("Order", orderSchema);
module.exports = Order;