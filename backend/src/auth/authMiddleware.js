const passport = require("passport");
const CustomApiError = require("../utils/ApiError");

// @desc Make sure the user is logged in
const requireLogIn = (req, res, next) =>
    passport.authenticate("jwt", { session: false }, (err, currentUser, info) => {
        if (err) return next(err);

        if (info) return next(info);

        if (!currentUser) {
            return next(CustomApiError.unauthorized("You are not login! Please login to access this route"));
        }

        req.crUser = currentUser;
        return next();
    })(req, res, next);

// permissions middleware
// @desc Make sure the user is logged in the same own url
const isAuth = (req, res, next) => {
    let user = req.Profile && req.crUser && req.Profile._id.toString() === req.crUser._id.toString();

    if (!user) {
        return next(CustomApiError.forbidden("Owner resource, Access denied!"));
    }
    next();
};

const isAdmin = (req, res, next) => {
    if (req.crUser.role !== "admin") {
        return next(CustomApiError.forbidden("Access denied!"));
    }
    next();
};

const allowedTo = (...roles) => (req, res, next) => {
    // access roles
    // access registered user role from req.crUser
    if (!roles.includes(req.crUser.role)) {
        return next(CustomApiError.forbidden("You are not allowed to access this route! Admin only"));
    }

    next();
};


module.exports = {
    requireLogIn,
    isAuth,
    isAdmin,
    allowedTo
};


