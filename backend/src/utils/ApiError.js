// @desc Error factory + naming constructors
class CustomApiError extends Error {
    constructor(message, statusCode, options = {}) {
        super(message);
        this.statusCode = statusCode;
        this.name = "CustomApiError";
        this.isOperational = true;
        this.code = options.code;
        this.param = options.param;
        //test for zodError details
        this.details = options.details;
        Error.captureStackTrace(this, this.constructor);
    }

    static badRequest(message = "Bad request!", param) {
        return new CustomApiError(message, 400, {
            code: "invalid_request",
            param
        });
    }
    static unauthorized(message = "Authorization required!", param) {
        return new CustomApiError(message, 401, {
            code: "unauthorized",
            param
        });
    }

    static forbidden(message = "Access denied!") {
        return new CustomApiError(message, 403, {
            code: "forbidden"
        })
    }
    static notFound(resource, param) {
        return new CustomApiError(`${resource} not found!`, 404,
            {
                code: "resource_not_found",
                param
            }
        );

    }
    static conflict(message = "Conflict!", param) {
        return new CustomApiError(message, 409, {
            code: "conflict",
            param
        })

    }
    static unprocessableEntity(message = "Unprocessable Entity!", param) {
        return new CustomApiError(message, 422, {
            code: "validation_error",
            param
        });
    }
    static tooManyRequests(message = "Too many requests! Try again later") {
        return new CustomApiError(message, 429, {
            code: "rate_limit_exceeded"
        });
    }
    static internal(message = "Internal server error!") {
        return new CustomApiError(message, 500, {
            code: "internal_error"
        });
    }
};

module.exports = CustomApiError;
