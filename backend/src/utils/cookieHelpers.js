const CustomApiError = require("./ApiError");

const getCookieName = () => {
    const cookieName = process.env.COOKIE_NAME || "authToken";
    return cookieName;
};

const getSameSite = () => {
    const sameSite = process.env.COOKIE_SAME_SITE || "lax";
    if (!["lax", "strict", "none"].includes(sameSite.toLowerCase())) {
        throw CustomApiError.internal("COOKIE_SAME_SITE must be lax, strict or none!");
    }
    return sameSite;
};

const getSecure = () => {
    return process.env.COOKIE_SECURE === "true";
};

const getCookieMaxAge = () => {
    const maxAge = process.env.COOKIE_MAX_AGE || "";
    const timeUnit = maxAge ? Number(maxAge) : 14 * 24 * 60 * 60 * 1000; // Default to 14 days in milliseconds
    if (!Number.isInteger(timeUnit) || timeUnit <= 0) {
        throw CustomApiError.internal("COOKIE_MAX_AGE must be a positive integer representing milliseconds!");
    }
    return timeUnit;
};


const getCookieSettings = () => ({
    httpOnly: true,
    secure: getSecure(),
    sameSite: getSameSite(),
    path: "/",
    maxAge: getCookieMaxAge(),
});

module.exports = {
    getCookieName,
    getCookieSettings
};
