const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const { User } = require("../models/index");
const { getCookieName } = require("../utils/cookieHelpers");
const passport = require("passport");

const cookieExtractor = (req) => {
    if (!req || !req.cookies) return null;
    return req.cookies[getCookieName()] || null;
};

// JWT strategy for authentication
passport.use(new JwtStrategy(
    {
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor, ExtractJwt.fromAuthHeaderAsBearerToken()]),
        secretOrKey: process.env.JWT_SECRET
    },

    async (payload, done) => {
        const userId = payload && payload.sub ? payload.sub : null;   // sub => subject, userId is stored

        if (!userId) return done(null, false);

        const user = await User.findById(userId);
        if (!user) return done(null, false);

        return done(null, user);
    }
));