import { useEffect, useState } from "react";

const BOOT_LINES = [
    "INITIALIZING SHOP CORE...",
    "LOADING RETRO MODULES...",
    "CONNECTING PRODUCT SYSTEM...",
    "SYNCING STORE DATA...",
    "SYSTEM STATUS: ONLINE",
];

export const useBootLoader = () => {
    const [progress, setProgress] = useState(0);
    const [visibleLines, setVisibleLines] = useState(0);
    const [bootComplete, setBootComplete] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }

                return prev + 2;
            });
        }, 55);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (progress >= 15 && visibleLines < 1) {
            setVisibleLines(1);
        }

        if (progress >= 35 && visibleLines < 2) {
            setVisibleLines(2);
        }

        if (progress >= 55 && visibleLines < 3) {
            setVisibleLines(3);
        }

        if (progress >= 75 && visibleLines < 4) {
            setVisibleLines(4);
        }

        if (progress >= 100 && visibleLines < 5) {
            setVisibleLines(5);
            setBootComplete(true);
        }
    }, [progress, visibleLines]);

    return {
        progress,
        visibleLines,
        bootComplete,
        bootLines: BOOT_LINES,
    };
};