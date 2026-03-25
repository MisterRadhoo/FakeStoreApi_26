// @desc Used to return user data without sensitive fields
const sanitizeUser = (userInfo) => ({
    id: userInfo._id,
    userName: userInfo.userName,
    email: userInfo.email,
    fullName: userInfo.fullName,
    role: userInfo.role,
    isActive: userInfo.isActive,
    wishlist: userInfo.wishlist,
    addresses: userInfo.addresses,
    createdAt: userInfo.createdAt,
    updatedAt: userInfo.createdAt
});

// @desc Compute login fraudScore and suspiciousActivity if ip and userAgent change
const getFraudAnalysis = (user, info) => {
    let suspiciousActivity = false;
    let fraudScore = Number(user.fraudScore) || 0;

    if (user.lastIp && info.ip && user.lastIp !== info.ip) {
        suspiciousActivity = true;
        fraudScore = Math.min(1, fraudScore + 0.2);
    }
    if (user.userAgent && info.userAgent && user.userAgent !== info.userAgent) {
        suspiciousActivity = true;
        fraudScore = Math.min(1, fraudScore + 0.1);
    }
    return {
        suspiciousActivity,
        fraudScore
    };
};


module.exports = { getFraudAnalysis, sanitizeUser };
