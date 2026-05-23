import { useEffect } from "react";

// @desc Close Modal with Esc button from keyboard
export const useEscapeClose = (onClose) => {
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);

        };
    }, [onClose]);
};