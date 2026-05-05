import { useState } from "react";

const CartCouponForm = ({ applyCoupon, removeCoupon, isMutating }) => {
    const [coupon, setCoupon] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!coupon) {
            return;
        }

        await applyCoupon(coupon);
        setCoupon("");
    };

    return (
        <div className="mt-6 flex flex-col gap-4">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                    id="coupon"
                    name="coupon"
                    type="text"
                    value={coupon}
                    onChange={(event) => setCoupon(event.target.value)}
                    placeholder="ENTER COUPON"
                    className="pixel-font w-full border-4 border-black bg-[#efefef] px-4 py-3 text-[10px] uppercase text-black outline-none placeholder:text-gray-500 caret-black dark:border-white dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-400 dark:caret-white"
                />

                <button
                    type="submit"
                    disabled={isMutating}
                    className="pixel-font border-4 border-black bg-yellow-300 px-4 py-3 text-xs text-black shadow-[6px_6px_0_#000] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none disabled:opacity-60"
                >
                    APPLY COUPON
                </button>
            </form>

            <button
                type="button"
                onClick={removeCoupon}
                disabled={isMutating}
                className="pixel-font border-4 border-black bg-pink-200 px-4 py-3 text-xs text-black shadow-[6px_6px_0_#000] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none disabled:opacity-60"
            >
                REMOVE COUPON
            </button>
        </div>
    );
};

export default CartCouponForm;