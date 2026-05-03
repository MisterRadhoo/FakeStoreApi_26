import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
    addProductToCart as addProductToCartRequest,
    getLoggedUserCart as getLoggedUserCartRequest,
    updateCartItemQuantity as updateCartItemQuantityRequest,
    removeSpecificCartItem as removeSpecificCartItemRequest,
    clearCart as clearCartRequest,
    applyCouponToCart as applyCouponToCartRequest,
    removeCouponFromCart as removeCouponFromCartRequest,
} from "./cartApi.js";
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
            const data = await getLoggedUserCartRequest();
            setCart(extractCart(data));
        } catch (err) {
            setCart(null);
            setError(err.response?.data?.message || "Failed loading the cart.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    const addToCart = useCallback(async (productId) => {
        setIsMutating(true);
        setError("");

        try {
            const data = await addProductToCartRequest({ productId });
            setCart(extractCart(data));
            return data;
        } catch (err) {
            const message = err.response?.data?.message || "Failed to add product to cart.";
            setError(message);
            throw err;
        } finally {
            setIsMutating(false);
        }
    }, []);

    const updateItemQuantity = useCallback(async ({ itemId, quantity }) => {
        setIsMutating(true);
        setError("");

        try {
            const data = await updateCartItemQuantityRequest({ itemId, quantity });
            setCart(extractCart(data));
            return data;
        } catch (err) {
            const message = err.response?.data?.message || "Failed to update cart item.";
            setError(message);
            throw err;
        } finally {
            setIsMutating(false);
        }
    }, []);

    const removeItem = useCallback(async (itemId) => {
        setIsMutating(true);
        setError("");

        try {
            const data = await removeSpecificCartItemRequest(itemId);
            setCart(extractCart(data));
            return data;
        } catch (err) {
            const message = err.response?.data?.message || "Failed to remove cart item.";
            setError(message);
            throw err;
        } finally {
            setIsMutating(false);
        }
    }, []);

    const clearUserCart = useCallback(async () => {
        setIsMutating(true);
        setError("");

        try {
            await clearCartRequest();
            setCart(null);
        } catch (err) {
            const message = err.response?.data?.message || "Failed to clear cart.";
            setError(message);
            throw err;
        } finally {
            setIsMutating(false);
        }
    }, []);

    const applyCoupon = useCallback(async (coupon) => {
        setIsMutating(true);
        setError("");

        try {
            const data = await applyCouponToCartRequest({ coupon });
            setCart(extractCart(data));
            return data;
        } catch (err) {
            const message = err.response?.data?.message || "Failed to apply coupon.";
            setError(message);
            throw err;
        } finally {
            setIsMutating(false);
        }
    }, []);

    const removeCoupon = useCallback(async () => {
        setIsMutating(true);
        setError("");

        try {
            const data = await removeCouponFromCartRequest();
            setCart(extractCart(data));
            return data;
        } catch (err) {
            const message = err.response?.data?.message || "Failed to remove coupon.";
            setError(message);
            throw err;
        } finally {
            setIsMutating(false);
        }
    }, []);

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

        refreshCart();
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