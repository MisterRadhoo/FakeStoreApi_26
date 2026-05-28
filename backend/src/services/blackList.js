const { BlackList } = require("../models/index");

// @desc Mark User from blackList with a label Bot or Toxic
const addBlackListLabel = async ({
    userId,
    reviewId,
    label,
    reason,
    aiScore,
    reviewTextSnapshot
}) => {
    return BlackList.findOneAndUpdate(
        {
            userId,
            reviewId,
            label
        },
        {
            userId,
            reviewId,
            label,
            reason,
            aiScore,
            reviewTextSnapshot
        },
        {
            new: true,
            upsert: true,
            runValidators: true
        }
    );
};


// @desc Get all blacklisted users
const findBlacklistedUsers = async () => {
    const blackList = await BlackList.find()
        .populate({ path: "userId", select: "userName _id" })
        .populate({ path: "reviewId", select: "title ratings _id" })
        .sort({ createdAt: -1 });

    return blackList.map((item) => {
        return {
            id: item._id,
            user: item.userId,
            review: item.reviewId,
            label: item.label,
            reason: item.reason,
            aiScore: item.aiScore,
            reviewTextSnapshot: item.reviewTextSnapshot,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt
        };
    });
};

module.exports = {
    addBlackListLabel,
    findBlacklistedUsers
};