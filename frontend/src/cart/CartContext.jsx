import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
    addProductToCart,
    getLoggedUserCart,
    updateCartItemQuantity,
    removeSpecificCartItem,
    clearCart,
    applyCouponToCart,
    removeCouponFromCart,
} from "./cartApi.js";
import { getErrorMessage } from "../utils/utils.js";
import { useAuth } from "../auth/AuthContext.jsx";

const CartContext = createContext(null);

const extractCart = (responseData) => {
    if (!responseData) {
        return null;
    }

    if (responseData.data) {
        return responseData.data;
    }

    return responseData;
};



export const CartProvider = ({ children }) => {
    const { isAuthenticated, isAuthLoading } = useAuth();

    const [cart, setCart] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isMutating, setIsMutating] = useState(false);
    const [error, setError] = useState("");

    const refreshCart = useCallback(async () => {
        setIsLoading(true);
        setError("");

        try {
            const data = await getLoggedUserCart();
            setCart(extractCart(data));
            return data;
        } catch (err) {
            setCart(null);
            setError(getErrorMessage(err, "Cart loading failed."));
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const addToCart = useCallback(async (productId) => {
        setIsMutating(true);
        setError("");

        try {
            const data = await addProductToCart({ productId });
            setCart(extractCart(data));
            return data;
        } catch (err) {
            setError(getErrorMessage(err, "Failed to add product to cart."));
            throw err;
        } finally {
            setIsMutating(false);
        }
    }, []);

    const updateItemQuantity = useCallback(async ({ itemId, quantity }) => {
        setIsMutating(true);
        setError("");

        try {
            const data = await updateCartItemQuantity({ itemId, quantity });
            setCart(extractCart(data));
            return data;
        } catch (err) {
            setError(getErrorMessage(err, "Failed to update cart item."));
            throw err;
        } finally {
            setIsMutating(false);
        }
    }, []);

    const removeItem = useCallback(async (itemId) => {
        setIsMutating(true);
        setError("");

        try {
            const data = await removeSpecificCartItem(itemId);
            setCart(extractCart(data));
            return data;
        } catch (err) {
            setError(getErrorMessage(err, "Failed to remove cart item."));
            throw err;
        } finally {
            setIsMutating(false);
        }
    }, []);

    const clearUserCart = useCallback(async () => {
        setIsMutating(true);
        setError("");

        try {
            const data = await clearCart();
            setCart(null);
            return data;
        } catch (err) {
            setError(getErrorMessage(err, "Failed to clear cart."));
            throw err;
        } finally {
            setIsMutating(false);
        }
    }, []);

    const applyCoupon = useCallback(async (coupon) => {
        setIsMutating(true);
        setError("");

        try {
            await applyCouponToCart({ coupon });
            return await refreshCart();
        } catch (err) {
            setError(getErrorMessage(err, "Failed to apply coupon."));
            throw err;
        } finally {
            setIsMutating(false);
        }
    }, [refreshCart]);

    const removeCoupon = useCallback(async () => {
        setIsMutating(true);
        setError("");

        try {
            await removeCouponFromCart();
            return await refreshCart();
        } catch (err) {
            setError(getErrorMessage(err, "Failed to remove coupon."));
            throw err;
        } finally {
            setIsMutating(false);
        }
    }, [refreshCart]);

    useEffect(() => {
        if (isAuthLoading) {
            return;
        }

        if (!isAuthenticated) {
            setCart(null);
            setError("");
            setIsLoading(false);
            setIsMutating(false);
            return;
        }

        refreshCart().catch(() => { });
    }, [isAuthenticated, isAuthLoading, refreshCart]);

    const cartItems = cart && cart.cartItems ? cart.cartItems : [];
    const itemsCount = cartItems.reduce((acc, item) => acc + Number(item.quantity || 0), 0);

    const value = useMemo(() => {
        return {
            cart,
            cartItems,
            itemsCount,
            isLoading,
            isMutating,
            error,
            refreshCart,
            addToCart,
            updateItemQuantity,
            removeItem,
            clearUserCart,
            applyCoupon,
            removeCoupon,
        };
    }, [
        cart,
        cartItems,
        itemsCount,
        isLoading,
        isMutating,
        error,
        refreshCart,
        addToCart,
        updateItemQuantity,
        removeItem,
        clearUserCart,
        applyCoupon,
        removeCoupon,
    ]);

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error("useCart must be used inside CartProvider.");
    }

    return context;
};