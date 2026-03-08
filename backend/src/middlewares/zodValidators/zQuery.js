
// zod Middleware for validating input types schema
const zQueryValidator = (schema) => (req, res, next) => {
    const parsedQuery = schema.safeParse(req.query);

    if (!parsedQuery.success) {
        parsedQuery.error.param = "query";
        return next(parsedQuery.error);
    }

    // decorating the request with parsed data
    req.Query = parsedQuery.data;      // DTO mapping => Data Transfer Object, converts input brute data objects into clean object (sanitized);
    return next();
};

module.exports = zQueryValidator;