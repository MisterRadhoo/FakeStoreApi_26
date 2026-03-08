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
      unique: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i, "Invalid email format"],  // basic email pattern example: something.something@domain.com, without spaces between characters
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
        _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
        alias: { type: String, maxlength: 16, trim: true },
        details: { type: String, maxlength: 35, trim: true },
        country: { type: String, maxlength: 15, trim: true },
        city: { type: String, maxlength: 15, trim: true },
        street: { type: String, maxlength: 45, trim: true },
        postalCode: { type: String, maxlength: 8, trim: true },
        phone: {
          type: String,
          minlength: 6,
          maxlength: 32,
          trim: true,
          match: [/^[0-9+\-\s()]*$/, "Invalid phone number format"]  // basic phone number pattern example: +40 712 345 678 or (021) 123-4567
        }
      }
    ],
  },
  {
    timestamps: true,
  }
);


// compound index for text search in userName and fullName fields
userSchema.index({ userName: "text", fullName: "text" });


// create User model from userSchema
const User = mongoose.model("User", userSchema);
module.exports = User;
