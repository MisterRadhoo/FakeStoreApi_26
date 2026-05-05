import { useState } from "react";
import { useCart } from "../CartContext.jsx";
import { useAuth } from "../../auth/AuthContext.jsx"

const AddToCartButton = ({ productId }) => {
    const { isAuthenticated } = useAuth();
    const { addToCart, isMutating } = useCart();

    const [isAdded, setIsAdded] = useState(false);
    const [warningMessage, setWarningMessage] = useState("");

    const handleAddToCart = async () => {
        if (!isAuthenticated) {
            setIsAdded(false);
            setWarningMessage("You must be logged in to add product to cart!");

            setTimeout(() => {
                setWarningMessage("");
            }, 3000);

            return;
        }

        setWarningMessage("");

        try {
            await addToCart(productId);
            setIsAdded(true);

            setTimeout(() => {
                setIsAdded(false);
            }, 2000);
        } catch {
            setIsAdded(false);
        }
    };

    return (
        <>
            {warningMessage ? (
                <p className="border-4 border-[#030712] bg-[#ff9aa2] px-3 py-2 text-center text-[10px] uppercase text-[#030712] shadow-[4px_4px_0_#030712] dark:border-white dark:bg-red-700 dark:text-white dark:shadow-[4px_4px_0_#ffffff]">
                    {warningMessage}
                </p>
            ) : null}

            <button
                type="button"
                onClick={handleAddToCart}
                disabled={isMutating}
                className={`pixel-font flex min-h-12 w-full items-center justify-center border-4 border-[#030712] px-4 py-3 text-center text-[10px] font-black uppercase tracking-widest text-[#030712] shadow-[5px_5px_0_#030712] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none disabled:cursor-not-allowed disabled:opacity-60 dark:border-white dark:shadow-[5px_5px_0_#ffffff] ${isAdded ? "bg-[#7fcf7a] text-black dark:bg-[#7fcf7a] dark:text-black" : "bg-sky-300 dark:bg-sky-500"
                    }`}
            >
                {isMutating ? "ADDING..." : isAdded ? "ADDED TO CART" : "ADD TO CART"}
            </button>
        </>
    );
};

export default AddToCartButton;