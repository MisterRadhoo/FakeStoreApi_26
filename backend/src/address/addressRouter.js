const express = require("express");
const router = express.Router();


// address controller functions
const {
    getLoggedUserAddresses,
    addAddress,
    removeAddress
} = require("../address/addressController");

// zod validation middlewares
const zBodyValidator = require("../middlewares/zodValidators/zBody");
const zParamsValidator = require("../middlewares/zodValidators/zParams");

// validators
const { zAddressSchema, idAddressSchema } = require("./addressSchema");

// permissions
const { requireLogIn, allowedTo } = require("../auth/authMiddleware");

// @desc Get logged User addresses list
// @access Private/User
router.get("/",
    [requireLogIn, allowedTo("user")],
    getLoggedUserAddresses);

// @desc Add address to User addresses list
// @access Private/User
router.post("/",
    [requireLogIn, allowedTo("user")],
    zBodyValidator(zAddressSchema),
    addAddress);

// @desc Remove address from User addresses list
// @access Private/User
router.delete("/:addressId",
    [requireLogIn, allowedTo("user")],
    zParamsValidator(idAddressSchema),
    removeAddress);


module.exports = router;