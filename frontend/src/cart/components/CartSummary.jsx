import CartCouponForm from "./CartCouponForm.jsx";

const CartSummary = ({
    cart,
    isMutating,
    applyCoupon,
    removeCoupon,
    clearUserCart,
}) => {
    const subtotal = cart && cart.totalCartPrice ? cart.totalCartPrice : 0;
    const totalAfterDiscount = cart && cart.totalPriceAfterDiscount ? cart.totalPriceAfterDiscount : 0;
    const finalTotal = totalAfterDiscount || subtotal;
    const appliedCoupon = cart && cart.couponId ? cart.couponId : null;

    return (
        <aside className="h-fit border-4 border-black bg-[#0b1637] p-6 text-white shadow-[10px_10px_0_#000]">
            <div className="flex flex-col gap-5">
                <div className="border-b-4 border-cyan-300 pb-4">
                    <h2 className="pixel-font text-sm text-cyan-300">CART SUMMARY</h2>
                </div>

                <div className="flex flex-col gap-4">
                    <p className="pixel-font text-[10px] uppercase leading-6">
                        SUBTOTAL: ${Number(subtotal).toFixed(2)}
                    </p>

                    {appliedCoupon ? (
                        <>
                            <p className="pixel-font text-[10px] uppercase leading-6 text-green-300">
                                COUPON: {appliedCoupon.name}
                            </p>

                            <p className="pixel-font text-[10px] uppercase leading-6 text-green-300">
                                DISCOUNT: {appliedCoupon.discount}%
                            </p>
                        </>
                    ) : null}

                    <p className="pixel-font text-[10px] uppercase leading-6">
                        AFTER DISCOUNT: ${Number(totalAfterDiscount).toFixed(2)}
                    </p>

                    <p className="pixel-font text-[10px] uppercase leading-6 text-yellow-300">
                        TOTAL: ${Number(finalTotal).toFixed(2)}
                    </p>
                </div>

                <CartCouponForm
                    applyCoupon={applyCoupon}
                    removeCoupon={removeCoupon}
                    isMutating={isMutating}
                />

                <button
                    type="button"
                    onClick={clearUserCart}
                    disabled={isMutating}
                    className="pixel-font mt-2 border-4 border-black bg-red-300 px-4 py-3 text-xs text-black shadow-[6px_6px_0_#000] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none disabled:opacity-60"
                >
                    CLEAR CART
                </button>

                <button
                    type="button"
                    className="pixel-font border-4 border-black bg-green-300 px-4 py-3 text-xs text-black shadow-[6px_6px_0_#000] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
                >
                    CHECKOUT
                </button>
            </div>
        </aside>
    );
};

export default CartSummary;