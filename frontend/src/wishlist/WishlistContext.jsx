import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext.jsx";
import {
    getLoggedUserWishlist,
    addProductToWishlist,
    removeProductFromWishlist,
} from "./wishlistApi.js";

const WishlistContext = createContext(null);

export const WishlistProvider = ({ children }) => {
    const { isAuthenticated } = useAuth();

    const [wishlist, setWishlist] = useState([]);
    const [isWishlistLoading, setIsWishlistLoading] = useState(false);

    const loadWishlist = async () => {
        setIsWishlistLoading(true);

        try {
            const result = await getLoggedUserWishlist();
            setWishlist(result.data);
        } catch {
            setWishlist([]);
        } finally {
            setIsWishlistLoading(false);
        }
    };

    useEffect(() => {
        if (!isAuthenticated) {
            setWishlist([]);
            setIsWishlistLoading(false);
            return;
        }

        loadWishlist();
    }, [isAuthenticated]);

    const addToWishlist = async (productId) => {
        const result = await addProductToWishlist(productId);
        setWishlist(result.data);
    };

    const removeFromWishlist = async (productId) => {
        const result = await removeProductFromWishlist(productId);
        setWishlist(result.data);
    };

    const isProductInWishlist = (productId) => {
        return wishlist.some((product) => product._id === productId);
    };

    return (
        <WishlistContext.Provider
            value={{
                wishlist,
                wishlistCount: wishlist.length,
                isWishlistLoading,
                addToWishlist,
                removeFromWishlist,
                isProductInWishlist,
            }}
        >
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error("useWishlist must be used within a WishlistProvider!");
    }
    return context;
};