// @desc Error helper
export const getErrorMessage = (error, fallbackMessage) => {
    if (
        error &&
        error.response &&
        error.response.data &&
        error.response.data.details &&
        error.response.data.details.issues &&
        error.response.data.details.issues.length > 0 &&
        error.response.data.details.issues[0].message
    ) {
        return error.response.data.details.issues[0].message;
    }

    if (
        error &&
        error.response &&
        error.response.data &&
        error.response.data.message
    ) {
        return error.response.data.message;
    }

    return fallbackMessage;
};

