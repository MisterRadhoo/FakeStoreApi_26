const ratelimiter = require("express-rate-limit");
const CustomApiError = require("../../utils/ApiError");

// middleware for rate limiting (1000ms = 1 second, 60 * 1000 =  60 seconds, 15  * 60 * 1000 = 15 min.);
const setRateLimiter = ({ windowMs = 5 * 60 * 1000, limit = 120, message = "Too many requests! Try again later for routing" } = {}) => {
    return ratelimiter({
        windowMs,
        limit,
        standardHeaders: true,
        legacyHeaders: false,
        handler: (req, res, next) => {
            return next(CustomApiError.tooManyRequests(message));
        }
    });
};

module.exports = setRateLimiter;