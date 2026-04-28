import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext.jsx";
import { getLoggedUserWishlist, addProductToWishlist, removeProductFromWishlist } from "./wishlistApi.js";


const WishlistContext = createContext(null);

export const WishlistProvider = ({ children }) => {
    const { user } = useAuth();

    const [wishlist, setWishlist] = useState([]);
    const [isWishlistLoading, setIsWishlistLoading] = useState(false);

    const loadWishlist = async () => {
        setIsWishlistLoading(true);

        const result = await getLoggedUserWishlist();

        setWishlist(result.data);
        setIsWishlistLoading(false);
    };

    useEffect(() => {
        if (!user) {
            setWishlist([]);
            setIsWishlistLoading(false);
            return;
        }

        loadWishlist();
    }, [user]);

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
                isProductInWishlist
            }}
        >
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => {
    return useContext(WishlistContext);
};