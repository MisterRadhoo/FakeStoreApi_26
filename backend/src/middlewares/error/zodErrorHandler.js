const { ZodError } = require("zod");
const CustomApiError = require("../../utils/ApiError");

// formating zod error from validations
function formatIssues(zodError) {
    return zodError.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
        code: issue.code
    }));
};

// global handler for zod errors
const zodErrorHandler = (err, req, res, next) => {
    const isZod = err && (err instanceof ZodError || (err.name === "ZodError" && Array.isArray(err.issues)));

    if (!isZod) {
        return next(err);
    }

    const origin = err.param || "body";
    return next(
        new CustomApiError("Zod validation error!", 400, {
            code: "zod_validation_error",
            param: origin,
            details: {
                origin,
                issues: formatIssues(err),    //array errors
            }
        })
    );
};

module.exports = zodErrorHandler;