import { Link } from "react-router-dom";
import WishlistButton from "../../components/dashboard/WishlistButton.jsx";
import AddToCartButton from "../../cart/components/AddToCartButton.jsx";

const ProductCard = ({ product }) => {

    {/* SOLD OUT Product */ }
    const isSoldOut = Number(product.stock) <= 0;

    return (
        <article className="relative border-4 border-[#030712] bg-[#fff6cc] p-4 text-[#030712] shadow-[8px_8px_0_#030712] dark:border-white dark:bg-[#374151] dark:text-white dark:shadow-[8px_8px_0_#ffffff]">

            {/* SOLD OUT Product */}
            {isSoldOut ? (
                <div className="pixel-font absolute left-4 top-4 z-10 border-4 border-black bg-red-500 px-3 py-2 text-[10px] uppercase text-white shadow-[4px_4px_0_#000] dark:border-white dark:shadow-[4px_4px_0_#ffffff]">
                    SOLD OUT
                </div>
            ) : null}

            <Link
                to={`/products/${product._id}`}
                className="relative mb-5 flex h-56 items-center justify-center border-4 border-[#030712] bg-white p-3 transition-all hover:translate-x-1 hover:translate-y-1 dark:border-white dark:bg-slate-900"
            >
                {product.imageCover ? (
                    <img
                        src={product.imageCover}
                        alt={product.title}
                        loading="lazy"
                        className="pixelated h-full w-full object-contain"
                    />
                ) : (
                    <span className="pixel-font text-xs text-[#030712] dark:text-white">
                        NO IMAGE
                    </span>
                )}
                {isSoldOut ? (
                    <div className="absolute inset-0 bg-black/50" />
                ) : null}

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

            <div className="mt-5 flex flex-col gap-3">
                <WishlistButton productId={product._id} />

                {/* SOLD OUT Product */}
                {isSoldOut ? (
                    <button
                        type="button"
                        disabled
                        className="pixel-font border-4 border-black bg-slate-400 px-6 py-3 text-xs uppercase text-white shadow-[8px_8px_0_#000] opacity-70 dark:border-white dark:shadow-[8px_8px_0_#ffffff]"
                    >
                        SOLD OUT
                    </button>
                ) : (
                    <AddToCartButton productId={product._id} />
                )}
            </div>
        </article>
    );
};

export default ProductCard;