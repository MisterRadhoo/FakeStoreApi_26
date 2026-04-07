const { findUserAddresses, addUserAddress, removeUserAddress } = require("./address");

// @desc Get logged User addresses list
const getLoggedUserAddresses = async (req, res) => {

    const addresses = await findUserAddresses(req.crUser._id);

    return res.status(200).json({
        message: "User addresses list!",
        results: addresses.length,
        data: addresses
    });
};


// @desc Add address to User addresses list
const addAddress = async (req, res) => {
    const addresses = await addUserAddress(
        req.crUser._id,
        req.body
    );

    return res.status(200).json({
        message: "Address added to the list!",
        results: addresses.length,
        data: addresses
    });
};


// @desc Remove address from User addresses list
const removeAddress = async (req, res) => {
    const addresses = await removeUserAddress(
        req.crUser._id,
        req.params.addressId
    );

    return res.status(200).json({
        message: "Address removed from list!",
        results: addresses.length,
        data: addresses
    });
};


module.exports = {
    getLoggedUserAddresses,
    addAddress,
    removeAddress
};