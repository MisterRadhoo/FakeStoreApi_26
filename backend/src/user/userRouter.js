const express = require("express");
const router = express.Router();

// User middlewares
const { getLoggedUserData, isDeactivate } = require("./userMiddleware");

// User controller functions
const {
    getUser,
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    changePassword,
    activateLoggedUserData,
    deleteLoggedUserData,
    updateLoggedUserData
} = require("./userController");

// zod validation middlewares
const zQueryValidator = require("../middlewares/zodValidators/zQuery");
const zBodyValidator = require("../middlewares/zodValidators/zBody");
const zParamsValidator = require("../middlewares/zodValidators/zParams");

// validators
const zPaginationSchema = require("../validators/zPagination");
const {
    idUserSchema,
    zCreateUserSchema,
    zUpdateUserSchema,
    zChangePasswordSchema,
    zUpdateLoggedUserSchema
} = require("./userValidatorSchema");

// permissions
const { requireLogIn, allowedTo } = require("../auth/authMiddleware");

// @desc User logged routes

// @desc Get logged User
// @access Private/Admin/User
router.get("/me",
    [requireLogIn, allowedTo("user", "admin")],
    isDeactivate,
    getLoggedUserData,
    getUser);

// @desc Update logged User
// @access Private/Admin/User
router.patch("/me",
    [requireLogIn, allowedTo("user", "admin")],
    isDeactivate,
    zBodyValidator(zUpdateLoggedUserSchema),
    updateLoggedUserData);

// @desc Activate logged User
// @access Private/Admin/User
router.put("/me/activate",
    [requireLogIn, allowedTo("user", "admin")],
    activateLoggedUserData);

// @desc Deactivate logged User
// @access Private/Admin/User
router.put("/me/deactivate",
    [requireLogIn, allowedTo("user", "admin")],
    deleteLoggedUserData);

// @desc Change password for logged User
// @access Private/Admin/User
router.put("/me/change-password",
    [requireLogIn, allowedTo("user", "admin")],
    isDeactivate,
    getLoggedUserData,
    zBodyValidator(zChangePasswordSchema),
    changePassword);

// Admin routes

// @desc Get all Users
// @access Private/Admin
router.get("/",
    [requireLogIn, allowedTo("admin")],
    zQueryValidator(zPaginationSchema),
    getAllUsers);

// @desc Get specific User
// @access Private/Admin
router.get("/:id",
    [requireLogIn, allowedTo("admin")],
    zParamsValidator(idUserSchema),
    getUser);

// @desc Create User
// @access Private/Admin
router.post("/",
    [requireLogIn, allowedTo("admin")],
    zBodyValidator(zCreateUserSchema),
    createUser);

// @desc Update specific User
// @access Private/Admin
router.patch("/:id",
    [requireLogIn, allowedTo("admin")],
    zParamsValidator(idUserSchema),
    zBodyValidator(zUpdateUserSchema),
    updateUser);

// @desc Delete specific User
// @access Private/Admin
router.delete("/:id",
    [requireLogIn, allowedTo("admin")],
    zParamsValidator(idUserSchema),
    deleteUser);


module.exports = router;