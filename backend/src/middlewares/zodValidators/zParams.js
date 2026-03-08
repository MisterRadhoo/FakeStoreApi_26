
// zod Middleware for validating input types schema
const zParamsValidator = (schema) => (req, res, next) => {
     const parsedParams = schema.safeParse(req.params);

     if (!parsedParams.success) {
          parsedParams.error.param = "params";
          return next(parsedParams.error);
     }

     req.params = parsedParams.data;
     return next();
};

module.exports = zParamsValidator;