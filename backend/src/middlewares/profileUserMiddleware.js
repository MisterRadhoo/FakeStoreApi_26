const CustomApiError = require("../utils/ApiError");
const { User } = require("../models/index");

// User profile based by id, on user if is logged in same own url
const userById = async (req, res, next, id) => {
    const user = await User.findById(id);
    if (!user) {
        throw CustomApiError.notFound(`User ${id}`, "id");
    }

    req.Profile = user;
    return next();
};

module.exports = userById;