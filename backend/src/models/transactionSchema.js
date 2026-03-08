const mongoose = require("mongoose");

// create trasactionSchema
const transactionSchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: false,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Transaction must be associated with a user."],
    },
    cartId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cart",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0
    },
    currency: {
      type: String,
      enum: ["USD", "EUR", "RON"],
      default: "RON",
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      enum: ["credit_card", "cash_on_delivery", "paypal", "bank_transfer"],
      default: "credit_card",
    },
    responseCode: {
      type: String,
    },
    idempotencyKey: {
      type: String,
      required: true,
      unique: true,
    },
    fraudScore: {
      type: Number,
      default: 0.0,
      min: 0,
      max: 1,
    },
    failureReason: {
      type: String,
    },
    provider: {
      type: String,
      enum: ["stripe", "bank_of_america", "bank_of_antwerp", "BCR"],
      default: "stripe",
    },
    providerPaymentId: {
      type: String,
      trim: true,
      default: undefined
    },
    attemptCount: {
      type: Number,
      default: 1,
      min: 1
    },
    flagged: {
      type: Boolean,
      default: false,
    },
    blacklisted: {
      type: Boolean,
      default: false,
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
    },
  },
  {
    timestamps: true,
  }
);

//indexes for optimizing queries
transactionSchema.index({ userId: 1, createdAt: -1 });
transactionSchema.index({ cartId: 1, createdAt: -1 });
transactionSchema.index({ providerPaymentId: 1 }, { unique: true, partialFilterExpression: { providerPaymentId: { $type: "string" } } });

// create Transaction Model from transactionSchema
const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;

