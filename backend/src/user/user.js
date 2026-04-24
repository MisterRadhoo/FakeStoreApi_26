const CustomApiError = require("../utils/ApiError");
const bcrypt = require("bcrypt");
const { userObject, checkUserNameAndEmail } = require("./helpers");
const { User } = require("../models/index");

// @desc Find User in db by id
const findUser = async (userId) => {
    const user = await User.findById(userId);
    if (!user) {
        throw CustomApiError.notFound(`User with id: ${userId}`, "userId");
    }

    return userObject(user);
};

// @desc Find all Users
const findAllUsers = async (limit, page, sort) => {
    // pagination
    const limitPage = limit ? Number(limit) : 7;
    const pageNumber = page ? Number(page) : 1;
    const skip = (pageNumber - 1) * limitPage;
    const sortBy = sort ? String(sort).split(",").join(" ") : "-createdAt";

    const users = await User.find()
        .select()
        .sort(sortBy)
        .skip(skip)
        .limit(limitPage);

    return {
        limit: limitPage,
        page: pageNumber,
        sort: sortBy,
        users: users.map(userObject)
    };
};

// @desc Create User account
const createUserAccount = async (userData) => {
    // Check if username or email already exists in db
    await checkUserNameAndEmail(userData);
    // User implementing
    const user = await User.create({
        userName: userData.userName,
        email: userData.email,
        password: await bcrypt.hash(userData.password,
            Number(process.env.BCRYPT_SALT_ROUNDS) || 12),
        fullName: userData.fullName,
        role: userData.role || "user"
    });

    return userObject(user);
};

// @desc Update User account
const updateUserAccount = async (userId, userData) => {
    const userExists = await User.exists({ _id: userId });
    if (!userExists) {
        throw CustomApiError.notFound(`User with id: ${userId}`, "userId");
    }

    const findOneUser = await User.findOne({
        _id: { $ne: userId },
        $or: [
            { userName: userData.userName },
            { email: userData.email }
        ]
    }).select("userName email");

    if (findOneUser && findOneUser.userName === userData.userName) {
        throw CustomApiError.badRequest("UserName already in use!", "userName");
    }

    if (findOneUser && findOneUser.email === userData.email) {
        throw CustomApiError.badRequest("Email already in use!", "email");
    }

    const userUpdate = await User.findByIdAndUpdate(userId, userData, {
        new: true,
        runValidators: true,
        context: "query"
    });

    return userObject(userUpdate);
};


// @desc Delete User account
const removeUserAccount = async (userId) => {
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
        throw CustomApiError.notFound(`User with id: ${userId}`, "userId");
    }
    return userObject(user);
};

// User logged
// @desc Change User password
const changeUserPassword = async (userId, userData) => {
    const user = await User.findById(userId).select("+password");

    if (!user) {
        throw CustomApiError.notFound(`User with id: ${userId}`, "userId");
    }

    const isSamePassword = await bcrypt.compare(userData.password, user.password);
    if (!isSamePassword) {
        throw CustomApiError.badRequest("Current password is incorrect!", "password");
    }
    const userUpdate = await User.findByIdAndUpdate(userId, {
        password: await bcrypt.hash(userData.newPassword,
            Number(process.env.BCRYPT_SALT_ROUNDS) || 12
        ),
        passwordChangedAt: Date.now()
    }, {
        new: true,
        runValidators: true,
        context: "query"
    });

    return userObject(userUpdate);
};

// @desc Activate User account
const activateUser = async (userId) => {
    const user = await User.findByIdAndUpdate(userId,
        { isActive: true },
        {
            new: true,
            runValidators: true,
            context: "query"
        });

    if (!user) {
        throw CustomApiError.notFound(`User with id: ${userId}`, "userId");
    }
    return userObject(user);
};

// @desc Deactivate User account
const deActivateUser = async (userId) => {
    const user = await User.findByIdAndUpdate(userId,
        { isActive: false },
        {
            new: true,
            runValidators: true,
            context: "query"
        });

    if (!user) {
        throw CustomApiError.notFound(`User with id: ${userId}`, "userId");
    }
    return userObject(user);
};

// @desc Update currentUser
const updateCurrentUser = async (userId, userData) => {
    const user = await User.findByIdAndUpdate(userId,
        {
            userName: userData.userName,
            email: userData.email,
            fullName: userData.fullName
        },
        {
            new: true,
            runValidators: true,
            context: "query"
        });

    if (!user) {
        throw CustomApiError.notFound(`User with id: ${userId}`, "userId");
    }

    return userObject(user);
};

module.exports = {
    findUser,
    findAllUsers,
    createUserAccount,
    updateUserAccount,
    removeUserAccount,
    changeUserPassword,
    activateUser,
    deActivateUser,
    updateCurrentUser
};