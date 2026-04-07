const mongoose = require("mongoose");

// create userSchema
const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 90,
      trim: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 90,
      trim: true,
      lowercase: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      minlength: 3,
      maxlength: 90,
      trim: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      index: true
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true
    },
    loginCount: {
      type: Number,
      default: 0,
    },
    lastLogin: {
      type: Date,
    },
    suspiciousActivity: {
      type: Boolean,
      default: false,
    },
    fraudScore: {
      type: Number,
      default: 0.0,
      min: 0,
      max: 1,
    },
    lastIp: {
      type: String,
      maxlength: 45,
    },
    userAgent: {
      type: String,
      default: null,
    },
    // reference to products in wishlist
    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
      }
    ],
    addresses: [
      {
        details: { type: String, maxlength: 35, trim: true },
        country: { type: String, maxlength: 15, trim: true },
        city: { type: String, maxlength: 15, trim: true },
        street: { type: String, maxlength: 45, trim: true },
        postalCode: { type: String, maxlength: 8, trim: true },
        phone: {
          type: String,
          minlength: 6,
          maxlength: 32,
          trim: true
        }
      }
    ],
  },
  {
    timestamps: true,
  }
);

// create User model from userSchema
const User = mongoose.model("User", userSchema);
module.exports = User;
