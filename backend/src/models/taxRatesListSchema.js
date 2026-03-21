const mongoose = require("mongoose");

// create taxRatesListSchema
const taxRatesListSchema = new mongoose.Schema({
    country: {
        type: String,
        required: true,
        minlength: [3, "Country name must be at least 3 characters"],
        maxlength: [60, "Country name must be less than 60 characters"],
        trim: true,
        unique: true
    },
    acronymCode: {
        type: String,
        required: true,
        minlength: [2, "Code must be at least 2 characters"],
        maxlength: [3, "Code must be less than 3 characters"],
        trim: true,
        uppercase: true,
        unique: true
    },
    vatRate: {
        type: Number,
        default: 0,
        min: 0,
        max: 1
    },
    shippingTaxRate: {
        type: Number,
        default: 0,
        min: 0,
        set: v => Math.round(v * 100) / 100
    }
},
    {
        timestamps: true
    }
);


// create TaxRatesList model from taxRatesListSchema
const TaxRatesList = mongoose.model("TaxRatesList", taxRatesListSchema);
module.exports = TaxRatesList;
