const mongoose = require("mongoose");

// create blackListSchema
const blackListSchema = new mongoose.Schema(
    {

        userId: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true
        },

        reviewId: {
            type: mongoose.Schema.ObjectId,
            ref: "Review",
            required: true
        },
        label: {
            type: String,
            enum: ["Bot", "Toxic"],
            required: true
        },
        reason: {
            type: String,
            required: true,
            maxlength: 300
        },
        aiScore: {
            type: Number,
            min: 0,
            max: 1,
            required: true,
            set: v => Math.round(v * 1000) / 1000
        },
        reviewTextSnapshot: {
            type: String,
            required: true,
            maxlength: 2000
        }
    },
    {
        timestamps: true
    }
);

// prevents duplicaties blacklist entries for the same user,review and label
blackListSchema.index({ userId: 1, reviewId: 1, label: 1 }, { unique: true });


// create BlackList model from blackListSchema
const BlackList = mongoose.model("BlackList", blackListSchema);
module.exports = BlackList;