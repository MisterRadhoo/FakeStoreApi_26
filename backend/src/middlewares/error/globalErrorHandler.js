const globalErrorHandler = (err, req, res, next) => {

    const statusCode = err.statusCode || 500;
    const isOperational = err.isOperational === true;

    // loggin error in console
    if (process.env.NODE_ENV !== "production") {
        console.error({
            type: err.name,
            statusCode: statusCode,
            code: err.code,
            param: err.param,
            message: err.message,
            path: req.originalUrl,
            method: req.method,
            stack: isOperational ? undefined : err.stack
        });
    }

    const response = {
        status: "error",
        statusCode: statusCode,  //http status
        code: err.code || null,  // codul semantic
        param: err.param || null, // parametru invalid
        message: err.message || "Unknown error",
        path: req.originalUrl,
        method: req.method,
    };

    //test zodError details
    if (err.details) response.details = err.details;

    res.status(statusCode).json(response);
};

module.exports = globalErrorHandler;