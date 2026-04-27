const express = require("express");
const router = express.Router();

// Order controller functions
const {
    createCashOrder,
    getOrderById,
    getLoggedUserOrders
} = require("./orderController");

// zod validation middlewares
const zParamsValidator = require("../middlewares/zodValidators/zParams");
const zBodyValidator = require("../middlewares/zodValidators/zBody");

// validators
const { idOrderSchema, zCreateOrderSchema } = require("./orderValidatorSchema");

// permissions
const { requireLogIn, allowedTo } = require("../auth/authMiddleware");

// @desc Create cash Order
// @access Private/User
router.post("/", requireLogIn, createCashOrder);

// @desc Get logged User Orders
// @access Private/User
router.get("/my-orders", [requireLogIn, allowedTo("user")], getLoggedUserOrders);

// @desc Get specific Order
// @access Private/User/Admin
router.get("/:id", [requireLogIn, allowedTo("user", "admin")], zParamsValidator(idOrderSchema), getOrderById);

module.exports = router;