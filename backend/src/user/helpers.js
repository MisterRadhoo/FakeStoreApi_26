const CustomApiError = require("../utils/ApiError");
const { User } = require("../models/index");

// @desc Used to return user data without sensitive fields
const userObject = (userInfo) => ({
    id: userInfo._id,
    userName: userInfo.userName,
    email: userInfo.email,
    fullName: userInfo.fullName,
    role: userInfo.role,
    isActive: userInfo.isActive,
    loginCount: userInfo.loginCount,
    suspiciousActivity: userInfo.suspiciousActivity,
    fraudScore: userInfo.fraudScore,
    userAgent: userInfo.userAgent,
    wishlist: userInfo.wishlist,
    addresses: userInfo.addresses,
    lastIp: userInfo.lastIp,
    lastLogin: userInfo.lastLogin
});

// @desc Check if username or email already exists in db
const checkUserNameAndEmail = async (data) => {
    const user = await User.findOne({
        $or: [
            { userName: data.userName },
            { email: data.email }
        ]
    }).select("userName email");

    if (!user) return;
    if (user.userName === data.userName) {
        throw CustomApiError.badRequest("UserName already in use!", "userName");
    }
    if (user.email === data.email) {
        throw CustomApiError.badRequest("Email already in use!", "email");
    }
};



module.exports = { userObject, checkUserNameAndEmail };