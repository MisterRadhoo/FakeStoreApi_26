const CustomApiError = require("../utils/ApiError");

// @desc Get logged User
const getLoggedUserData = (req, res, next) => {
    req.params.id = req.crUser._id;
    next();
};

// @desc Check if account is not activated
const isDeactivate = (req, res, next) => {
    if (!req.crUser.isActive) {
        throw CustomApiError.unauthorized("Your account has been deactivated. Please reactivate your account.", "isActive");
    }
    next();
};

module.exports = {
    getLoggedUserData,
    isDeactivate
};