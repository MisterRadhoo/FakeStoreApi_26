const factory = require("./handlerFactory");
const { Brand } = require("../models/index");

// @desc Create Brand
const createBrand = factory.createOne(Brand, "Brand");
// @desc Get specific Brand
const getBrand = factory.getOne(Brand, null, "Brand");
// @desc Update specific Brand
const updateBrand = factory.updateOne(Brand, "Brand");
// @desc Delete specific Brand
const removeBrand = factory.deleteOne(Brand, "Brand");
// @desc Get all Brands
const getAllBrands = factory.getAll(Brand);


module.exports = {
    createBrand,
    getBrand,
    updateBrand,
    removeBrand,
    getAllBrands,
};