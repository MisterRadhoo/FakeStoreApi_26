const {
    findUser,
    findAllUsers,
    createUserAccount,
    updateUserAccount,
    removeUserAccount,
    changeUserPassword,
    activateUser,
    deActivateUser,
    updateCurrentUser
} = require("./user");

// @desc Get specific User
const getUser = async (req, res) => {
    const user = await findUser(req.params.id);

    return res.status(200).json({
        message: "User information retrieved!",
        userInfo: user
    });
};

// @desc Get all Users
const getAllUsers = async (req, res) => {
    const result = await findAllUsers(
        req.Query.limit,
        req.Query.page,
        req.Query.sort
    );

    return res.status(200).json({
        object: "users_list",
        limit: result.limit,
        page: result.page,
        sort: result.sort,
        count: result.users.length,
        users: result.users
    });
};

// @desc Create User
const createUser = async (req, res) => {
    const user = await createUserAccount(req.body);

    return res.status(201).json({
        message: "User has been created!",
        data: user
    });
};

// @desc Update specific User
const updateUser = async (req, res) => {
    const user = await updateUserAccount(req.params.id, req.body);

    return res.status(200).json({
        message: "User has been updated!",
        data: user
    });
};

// @desc Delete specific User
const deleteUser = async (req, res) => {
    const user = await removeUserAccount(req.params.id);

    return res.status(204).send();
};


// @desc Activate logged User
const activateLoggedUserData = async (req, res) => {
    const user = await activateUser(req.crUser._id);

    return res.status(200).json({
        message: `User ${user.userName} has been activated!`,
        data: user
    });
};

// @desc Deactivate logged User
const deleteLoggedUserData = async (req, res) => {
    const user = await deActivateUser(req.crUser._id);

    return res.status(200).json({
        message: `User ${user.userName} has been deactivated!`,
        data: user
    });
};

// @desc Update logged User
const updateLoggedUserData = async (req, res) => {
    const user = await updateCurrentUser(req.crUser._id, req.body);

    return res.status(200).json({
        message: `User ${user.userName} has been updated!`,
        data: user
    });
};

// @desc Change password for logged User
const changePassword = async (req, res) => {
    const user = await changeUserPassword(req.crUser._id, req.body);

    return res.status(200).json({
        message: `User ${user.userName} password has been changed!`,
        data: user
    });
};



module.exports = {
    getUser,
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    changePassword,
    activateLoggedUserData,
    deleteLoggedUserData,
    updateLoggedUserData
};