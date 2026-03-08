const CustomApiError = require("../../utils/ApiError");

const jwtErrorHandler = (err, req, res, next) => {
    switch (true) {
        case err.message === "No auth token":
            return next(CustomApiError.unauthorized("No auth token! Please login again", "token"));

        case err.name === "JsonWebTokenError":
            return next(CustomApiError.unauthorized("Malformed jwt token! Please login again", "token"));

        case err.name === "TokenExpiredError":
            return next(CustomApiError.unauthorized("Expired token!"));

        case err.name === "NotBeforeError":
            return next(CustomApiError.unauthorized("Token is not valid yet"));

        default:
            next(err);
    };
};

module.exports = jwtErrorHandler;