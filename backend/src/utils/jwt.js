const jwt = require("jsonwebtoken");
const CustomApiError = require("./ApiError");

const getJwtSecret = () => {
    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
        throw CustomApiError.internal("JWT secret is not defined in .env or is missing!");
    }
    return secretKey;
};

const getJwtExpiration = () => {
    return process.env.JWT_EXPIRES_IN || "1d"; // Default to 1 day if not specified
};

const signAccessToken = (userId) => {
    if (!userId) {
        throw CustomApiError.internal("User Id is required to sign JWT token!");
    }

    return jwt.sign({ sub: userId }, getJwtSecret(), { expiresIn: getJwtExpiration() });
};

module.exports = signAccessToken;



