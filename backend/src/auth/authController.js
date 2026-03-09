const { signUp, signIn } = require("./authService");
const { getCookieSettings, getCookieName } = require("../utils/cookieHelpers");

// @desc Create new User in db
const register = async (req, res) => {
    const user = await signUp(req.body);
    return res.status(201).json({
        status: "Registered successfully!",
        data: user
    });
};

// @desc Authenticate current User
const login = async (req, res) => {
    const { token, user } = await signIn(req.body, {
        ip: req.ip,
        userAgent: req.headers["user-agent"] || null
    });

    res.cookie(getCookieName(), token, getCookieSettings());
    return res.status(200).json({
        status: `Welcome back, ${user.userName}!`,
        token: token,
        data: user
    });
};

// @desc logout User
const logout = async (req, res) => {
    const cookieSettings = getCookieSettings();

    res.clearCookie(getCookieName(), {
        httpOnly: true,
        secure: cookieSettings.secure,
        sameSite: cookieSettings.sameSite,
        path: cookieSettings.path
    });

    return res.status(200).json({
        status: "Logged out successfully!"
    });
};


module.exports = {
    register,
    login,
    logout
};