import { useEffect, useRef, useState } from "react";

import axiosClient from "../config/api.js";

const MESSAGE_TIMEOUT = 4500;

const useGlobalRequestHandler = () => {
    const [tooManyRequestsMessage, setTooManyRequestsMessage] = useState("");
    const [serverErrorMessage, setServerErrorMessage] = useState("");
    const [serviceUnavailableMessage, setServiceUnavailableMessage] = useState("");

    const tooManyRequestsTimeoutRef = useRef(null);
    const serverErrorTimeoutRef = useRef(null);
    const serviceUnavailableTimeoutRef = useRef(null);

    useEffect(() => {
        const clearMessageAfterDelay = (timeoutRef, setMessage, message) => {
            setMessage(message);

            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            timeoutRef.current = setTimeout(() => {
                setMessage("");
            }, MESSAGE_TIMEOUT);
        };

        const showTooManyRequestsMessage = (message) => {
            clearMessageAfterDelay(
                tooManyRequestsTimeoutRef,
                setTooManyRequestsMessage,
                message
            );
        };

        const showServerErrorMessage = (message) => {
            clearMessageAfterDelay(
                serverErrorTimeoutRef,
                setServerErrorMessage,
                message
            );
        };

        const showServiceUnavailableMessage = (message) => {
            clearMessageAfterDelay(
                serviceUnavailableTimeoutRef,
                setServiceUnavailableMessage,
                message
            );
        };

        const interceptorId = axiosClient.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response && error.response.status === 429) {
                    showTooManyRequestsMessage(
                        "Too many requests. Please wait and try again later."
                    );

                    return Promise.reject(error);
                }

                if (error.response && error.response.status === 500) {
                    showServerErrorMessage(
                        error.response.data &&
                            error.response.data.message
                            ? error.response.data.message
                            : "Internal server error."
                    );

                    return Promise.reject(error);
                }

                if (error.response && error.response.status === 503) {
                    showServiceUnavailableMessage(
                        error.response.data &&
                            error.response.data.message
                            ? error.response.data.message
                            : "Service unavailable. Please try again later."
                    );

                    return Promise.reject(error);
                }

                if (!error.response && error.request) {
                    showServiceUnavailableMessage(
                        "Server is currently unavailable. Please try again later."
                    );

                    return Promise.reject(error);
                }

                return Promise.reject(error);
            }
        );

        return () => {
            axiosClient.interceptors.response.eject(interceptorId);

            if (tooManyRequestsTimeoutRef.current) {
                clearTimeout(tooManyRequestsTimeoutRef.current);
            }

            if (serverErrorTimeoutRef.current) {
                clearTimeout(serverErrorTimeoutRef.current);
            }

            if (serviceUnavailableTimeoutRef.current) {
                clearTimeout(serviceUnavailableTimeoutRef.current);
            }
        };
    }, []);

    return {
        tooManyRequestsMessage,
        serverErrorMessage,
        serviceUnavailableMessage
    };
};

export default useGlobalRequestHandler;