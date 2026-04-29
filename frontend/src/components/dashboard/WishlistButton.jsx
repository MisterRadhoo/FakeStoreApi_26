import { useState } from "react";
import { useWishlist } from "../../wishlist/WishlistContext.jsx";
import { useAuth } from "../../auth/AuthContext.jsx";


const WishlistButton = ({ productId }) => {
    const { isAuthenticated } = useAuth();
    const { addToWishlist, removeFromWishlist, isProductInWishlist } = useWishlist();

    const [warningMessage, setWarningMessage] = useState("");

    const isInWishlist = isProductInWishlist(productId);

    const handleWishlistClick = async () => {
        if (!isAuthenticated) {
            setWarningMessage("You must be logged in to add Product to wishlist!");

            setTimeout(() => {
                setWarningMessage("");
            }, 3000);

            return;
        }

        setWarningMessage("");

        if (isInWishlist) {
            await removeFromWishlist(productId);
            return;
        }

        await addToWishlist(productId);
    };

    return (
        <>
            {warningMessage && (
                <p className="mt-4 border-4 border-[#030712] bg-[#ff9aa2] px-3 py-2 text-center text-[10px] uppercase text-[#030712] shadow-[4px_4px_0_#030712] dark:border-white dark:bg-red-700 dark:text-white dark:shadow-[4px_4px_0_#ffffff]">
                    {warningMessage}
                </p>
            )}

            <button
                type="button"
                onClick={handleWishlistClick}
                className={`mt-5 flex min-h-12 w-full items-center justify-center border-4 border-[#030712] px-4 py-3 text-center text-[10px] uppercase text-[#030712] shadow-[5px_5px_0_#030712] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none dark:border-white dark:text-white dark:shadow-[5px_5px_0_#ffffff] ${isInWishlist
                        ? "bg-[#ff9aa2] dark:bg-red-700"
                        : "bg-[#d333e5] dark:bg-purple-700"
                    }`}
            >
                {isInWishlist ? "REMOVE WISHLIST" : "ADD WISHLIST"}
            </button>
        </>
    );
};

export default WishlistButton;