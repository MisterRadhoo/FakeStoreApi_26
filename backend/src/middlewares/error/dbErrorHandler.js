const CustomApiError = require("../../utils/ApiError");

const dbErrorMiddleware = (err, req, res, next) => {
    // Mongoose validationError sanitizer
    if (err.name === "ValidationError") {
        const arrErrors = Object.values(err.errors || {});
        const firstError = arrErrors[0];
        return next(CustomApiError.unprocessableEntity(arrErrors.map(e => e.message).join(", "), firstError.path || null));
    }

    // MongoDB unique index error sanitizer
    if (err.code && err.code === 11000 || err.code === 11001) {
        const keyValue = err.keyValue || {};
        let key = Object.keys(keyValue)[0] || Object.keys(err.keyPattern || {})[0] || null;
        const value = key && keyValue ? keyValue[key] : null;
        return next(CustomApiError.conflict(key ? `Value ${value} for field ${key} already exists` : "Duplicate value", key));
    }

    // MongoDB _id, ObjectId invalid error sanitizer
    if (err.name === "CastError") {
        return next(CustomApiError.badRequest("Invalid ObjectId!", err.path || "id"));
    }

    return next(err);
}

module.exports = dbErrorMiddleware;