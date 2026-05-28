const { findBlacklistedUsers } = require("../services/blackList");

// @desc Get blacklisted Users
const getBlackList = async (req, res) => {
    const blackList = await findBlacklistedUsers();

    return res.status(200).json({
        message: "Blacklist retrieved!",
        results: blackList.length,
        data: blackList
    });
};


module.exports = getBlackList;