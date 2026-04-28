import { Link } from "react-router-dom";
import { useState } from "react";
import { useWishlist } from "../../wishlist/WishlistContext.jsx";
import { useAuth } from "../../auth/AuthContext.jsx";

const ProductCard = ({ product }) => {
    const { isAuthenticated } = useAuth();
    const { addToWishlist, removeFromWishlist, isProductInWishlist } = useWishlist();

    const [warningMessage, setWarningMessage] = useState("");

    const isInWishlist = isProductInWishlist(product._id);

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
            await removeFromWishlist(product._id);
            return;
        }

        await addToWishlist(product._id);
    };

    return (
        <article className="border-4 border-[#030712] bg-[#fff6cc] p-5 text-[#030712] shadow-[8px_8px_0_#030712] dark:border-white dark:bg-[#374151] dark:text-white dark:shadow-[8px_8px_0_#ffffff]">
            <Link
                to={`/products/${product._id}`}
                className="mb-5 flex h-72 items-center justify-center border-4 border-[#030712] bg-white p-3 transition-all hover:translate-x-1 hover:translate-y-1 dark:border-white dark:bg-slate-900"
            >
                {product.imageCover && (
                    <img
                        src={product.imageCover}
                        alt={product.title}
                        className="pixelated h-full w-full object-contain"
                    />
                )}
            </Link>

            <h2 className="mb-4 line-clamp-2 text-xs leading-6 text-[#030712] dark:text-white">
                {product.title}
            </h2>

            <div className="space-y-3 text-[10px] leading-5 text-[#030712] dark:text-white">
                <p>
                    PRICE: {product.price} {product.currency}
                </p>

                <p>
                    RATE: {product.ratingsAverage || 0}

                </p>

                <p>
                    STOCK: {product.stock}

                </p>

                <p>
                    SOLD: {product.sold || 0}

                </p>
            </div>

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
                    : "bg-[#ffb6dd] dark:bg-pink-700"
                    }`}
            >
                {isInWishlist ? "REMOVE WISHLIST" : "ADD WISHLIST"}
            </button>
        </article>
    );
};

export default ProductCard;