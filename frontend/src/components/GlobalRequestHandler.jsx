import { useEffect, useRef, useState } from "react";

import axiosClient from "../config/api.js";
import TooManyRequests from "./TooManyRequests.jsx";

const GlobalRequestHandler = () => {
    const [tooManyRequestsMessage, setTooManyRequestsMessage] = useState("");
    const timeoutRef = useRef(null);

    useEffect(() => {
        const interceptorId = axiosClient.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response && error.response.status === 429) {
                    setTooManyRequestsMessage(
                        "Too many requests. Please wait and try again later."
                    );

                    if (timeoutRef.current) {
                        clearTimeout(timeoutRef.current);
                    }

                    timeoutRef.current = setTimeout(() => {
                        setTooManyRequestsMessage("");
                    }, 4500);
                }

                return Promise.reject(error);
            }
        );

        return () => {
            axiosClient.interceptors.response.eject(interceptorId);

            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return <TooManyRequests message={tooManyRequestsMessage} />;
};

export default GlobalRequestHandler;