const factory = require("./handlerFactory");
const { TaxRatesList } = require("../models/index");

// @desc Create TaxRate
const createTaxRate = factory.createOne(TaxRatesList, "TaxRatesList");
// @desc Get specific TaxRate
const getTaxRate = factory.getOne(TaxRatesList, null, "TaxRateslist");
// @desc Update specific TaxRate
const updateTaxRate = factory.updateOne(TaxRatesList, "TaxRatesList");
// @desc Delete specific TaxRate
const removeTaxRate = factory.deleteOne(TaxRatesList, "TaxRatesList");
// @desc Get all TaxRates
const getAllTaxRates = factory.getAll(TaxRatesList);

module.exports = {
    createTaxRate,
    getTaxRate,
    updateTaxRate,
    removeTaxRate,
    getAllTaxRates
};