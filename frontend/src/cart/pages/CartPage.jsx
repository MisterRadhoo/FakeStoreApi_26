import { useCart } from "../CartContext.jsx";
import CartContainer from "../components/CartContainer.jsx";

const CartPage = () => {
    const {
        cart,
        cartItems,
        isLoading,
        isMutating,
        error,
        updateItemQuantity,
        removeItem,
        applyCoupon,
        removeCoupon,
        clearUserCart,
    } = useCart();

    if (isLoading) {
        return (
            <section className="min-h-screen bg-[#d8cca3] px-4 py-10 dark:bg-slate-950">
                <div className="mx-auto max-w-7xl">
                    <div className="border-4 border-black bg-white p-8 shadow-[10px_10px_0_#000] dark:bg-slate-900 dark:text-white">
                        <h1 className="pixel-font text-lg">LOADING CART...</h1>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="min-h-screen bg-[#d8cca3] px-4 py-10 text-black dark:bg-slate-950 dark:text-white">
            <div className="mx-auto max-w-7xl">
                <div className="mb-8 border-4 border-black bg-[#efefef] p-8 shadow-[12px_12px_0_#000] dark:bg-slate-900">
                    <p className="pixel-font text-[10px] text-red-400">
                        RETRO STORE // CART MODULE
                    </p>

                    <h1 className="pixel-font mt-6 text-2xl leading-[1.6] md:text-4xl">
                        MY CART
                    </h1>

                    {error ? (
                        <div className="mt-6">
                            <div className="inline-block max-w-md border-4 border-[#030712] bg-[#ff9aa2] px-6 py-4 text-center shadow-[5px_5px_0_#030712] dark:border-white dark:bg-red-700 dark:shadow-[5px_5px_0_#ffffff]">
                                <p className="pixel-font text-[10px] uppercase leading-6 text-[#030712] dark:text-white">
                                    {error}
                                </p>
                            </div>
                        </div>
                    ) : null}
                </div>

                <CartContainer
                    cart={cart}
                    cartItems={cartItems}
                    isMutating={isMutating}
                    updateItemQuantity={updateItemQuantity}
                    removeItem={removeItem}
                    applyCoupon={applyCoupon}
                    removeCoupon={removeCoupon}
                    clearUserCart={clearUserCart}
                />
            </div>
        </section>
    );
};

export default CartPage;