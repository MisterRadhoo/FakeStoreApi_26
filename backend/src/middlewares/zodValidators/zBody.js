
// zod Middleware for validating input types schema
const zBodyValidator = (schema) => (req, res, next) => {
    const parsedBody = schema.safeParse(req.body);

    if (!parsedBody.success) {
        parsedBody.error.param = "body";
        return next(parsedBody.error);
    }
    
    req.body = parsedBody.data;
    return next();
};

module.exports = zBodyValidator;