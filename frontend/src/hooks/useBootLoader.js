import { useEffect, useState } from "react";
import { getProducts } from "../products/productsApi.js";
import { getCategories } from "../category/categoryApi.js";
import { getBrands } from "../brand/brandApi.js";

const INITIAL_LINES = [
    "INITIALIZING SHOP CORE...",
    "LOADING RETRO MODULES..."
];

export const useBootLoader = (isAuthenticated, user) => {
    const [progress, setProgress] = useState(0);
    const [visibleLines, setVisibleLines] = useState(0);
    const [bootComplete, setBootComplete] = useState(false);
    const [bootLines, setBootLines] = useState(INITIAL_LINES);

    useEffect(() => {
        const loadStoreData = async () => {
            try {
                const [productsResponse, categoriesResponse, brandsResponse] = await Promise.all([
                    getProducts({}),
                    getCategories(),
                    getBrands()
                ]);

                const products = Array.isArray(productsResponse.data)
                    ? productsResponse.data
                    : [];

                const categories = Array.isArray(categoriesResponse.data)
                    ? categoriesResponse.data
                    : [];

                const brands = Array.isArray(brandsResponse.data)
                    ? brandsResponse.data
                    : [];

                setBootLines([
                    "INITIALIZING SHOP CORE...",
                    "LOADING RETRO MODULES...",
                    `PRODUCTS LOADED: ${products.length}`,
                    `CATEGORIES LOADED: ${categories.length}`,
                    `BRANDS LOADED: ${brands.length}`,
                    isAuthenticated && user && user.userName
                        ? `SESSION USER NAME: ${user.userName.toUpperCase()}`
                        : "SESSION: GUEST",
                    "SYSTEM STATUS: ONLINE"
                ]);
            } catch (error) {
                console.log(error);

                setBootLines([
                    "INITIALIZING SHOP CORE...",
                    "LOADING RETRO MODULES...",
                    "FAILED TO LOAD STORE DATA",
                    isAuthenticated && user && user.userName
                        ? `SESSION USER NAME: ${user.userName.toUpperCase()}`
                        : "SESSION: GUEST",
                    "SYSTEM STATUS: DEGRADED"
                ]);
            }
        };

        loadStoreData();
    }, [isAuthenticated, user]);

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
        if (bootLines.length === 0) {
            return;
        }

        const step = 100 / bootLines.length;
        const nextVisibleLines = Math.min(
            bootLines.length,
            Math.floor(progress / step)
        );

        setVisibleLines(nextVisibleLines);

        if (progress >= 100) {
            setVisibleLines(bootLines.length);
            setBootComplete(true);
        }
    }, [progress, bootLines]);

    return {
        progress,
        visibleLines,
        bootComplete,
        bootLines
    };
};