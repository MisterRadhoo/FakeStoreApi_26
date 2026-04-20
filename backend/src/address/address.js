const CustomApiError = require("../utils/ApiError");
const { User } = require("../models/index");

// @desc Find User address by userId
const findUserAddresses = async (userId) => {
    const user = await User.findById(userId);
    if (!user) {
        throw CustomApiError.notFound(`User with id: ${userId}`, "userId");
    }

    return user.addresses;
};

// @desc Add address to User addresses list
const addUserAddress = async (userId, addressInfo) => {

    const user = await User.findByIdAndUpdate(userId,
        { $addToSet: { addresses: addressInfo } },
        {
            new: true,
            runValidators: true
        });

    if (!user) {
        throw CustomApiError.notFound(`User with id: ${userId}`, "userId");
    }

    return user.addresses;
};


// @desc Remove address from User addresses list
const removeUserAddress = async (userId, addressId) => {

    const user = await User.findByIdAndUpdate(userId,
        { $pull: { addresses: { _id: addressId } } },
        {
            new: true,
            runValidators: true
        }
    );

    if (!user) {
        throw CustomApiError.notFound(`User with id: ${userId}`, "userId");
    }
    return user.addresses;
};



module.exports = {
    findUserAddresses,
    addUserAddress,
    removeUserAddress
};