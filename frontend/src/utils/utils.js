// @desc Get error helper
export const getErrorMessage = (error, fallbackMessage = "Something went wrong!") => {
    if (
        error &&
        error.response &&
        error.response.data &&
        error.response.data.details &&
        Array.isArray(error.response.data.details.issues) &&
        error.response.data.details.issues.length > 0 &&
        typeof error.response.data.details.issues[0].message === "string"
    ) {
        return error.response.data.details.issues[0].message;
    }

    if (
        error &&
        error.response &&
        error.response.data &&
        typeof error.response.data.message === "string"
    ) {
        return error.response.data.message;
    }

    return fallbackMessage;
};