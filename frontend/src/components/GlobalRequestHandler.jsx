import TooManyRequests from "./TooManyRequests.jsx";
import ServerError from "./ServerError.jsx";
import ServiceUnavailable from "./ServiceUnavailable.jsx";
import useGlobalRequestHandler from "../hooks/useGlobalRequestHandler.js";

const GlobalRequestHandler = () => {
    const {
        tooManyRequestsMessage,
        serverErrorMessage,
        serviceUnavailableMessage
    } = useGlobalRequestHandler();

    return (
        <>
            <TooManyRequests message={tooManyRequestsMessage} />
            <ServerError message={serverErrorMessage} />
            <ServiceUnavailable message={serviceUnavailableMessage} />
        </>
    );
};

export default GlobalRequestHandler;