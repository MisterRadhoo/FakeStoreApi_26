const passport = require("passport");
const CustomApiError = require("../utils/ApiError");

// @desc Make sure the user is logged in
const requireLogIn = (req, res, next) =>
    passport.authenticate("jwt", { session: false }, (err, currentUser, info) => {
        if (err) return next(err);

        if (info) return next(info);

        if (!currentUser) {
            return next(CustomApiError.unauthorized("You are not logged in! Please login to access this route"));
        }

        req.crUser = currentUser;
        return next();
    })(req, res, next);



const allowedTo = (...roles) => (req, res, next) => {
    // access roles
    // access registered user role from req.crUser
    if (!roles.includes(req.crUser.role)) {
        return next(CustomApiError.forbidden("You are not allowed to access this route!"));
    }

    next();
};


module.exports = {
    requireLogIn,
    allowedTo
};


