const CustomApiError = require("../utils/ApiError");
const bcrypt = require("bcrypt");
const signAccessToken = require("../utils/jwt");
const { getFraudAnalysis, sanitizeUser } = require("./helpers");
const { User } = require("../models/index");

// @desc Create account for new User
const signUp = async (data) => {
    const isFound = await User.find({
        $or: [
            { userName: data.userName },
            { email: data.email }
        ]
    }).select("userName email");

    const isUserNameTaken = isFound.some((user) => user.userName === data.userName);
    const isEmailTaken = isFound.some((user) => user.email === data.email);

    if (isUserNameTaken) {
        throw CustomApiError.badRequest("Username already in use!", "userName");
    }
    if (isEmailTaken) {
        throw CustomApiError.badRequest("Email already in use!", "email");
    }

    const salt = Number(process.env.BCRYPT_SALT_ROUNDS) || 12;
    const hashedPassword = await bcrypt.hash(data.password, salt);

    const user = await User.create({
        userName: data.userName,
        email: data.email,
        password: hashedPassword,
        fullName: data.fullName,
    });

    return sanitizeUser(user);
};

// @desc Authenticate current User
const signIn = async (data, info) => {
    const user = await User.findOne({ email: data.email });
    if (!user) {
        throw CustomApiError.unauthorized("Invalid email or password!", "email | password");
    }

    if (user.isActive === false) {
        throw CustomApiError.forbidden("This account is deactivated!");
    }

    const isSamePassword = await bcrypt.compare(data.password, user.password);
    if (!isSamePassword) {
        throw CustomApiError.unauthorized("Invalid email or password!", "email | password");
    }

    const { suspiciousActivity, fraudScore } = getFraudAnalysis(user, info);

    const updatedUser = await User.findByIdAndUpdate(user._id, {
        $inc: { loginCount: 1 },
        $set: {
            lastLogin: new Date(),
            lastIp: info.ip,
            userAgent: info.userAgent,
            suspiciousActivity,
            fraudScore
        }
    }, {
        new: true,
        runValidators: true,
        context: "query"
    });

    const token = signAccessToken(updatedUser._id.toString());

    return {
        token: token,
        user: sanitizeUser(updatedUser)
    };
};


module.exports = {
    signUp,
    signIn
};






