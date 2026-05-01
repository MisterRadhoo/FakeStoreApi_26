import { Link } from "react-router-dom";
import WishlistButton from "./WishlistButton.jsx";


const ProductCard = ({ product }) => {
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
                        loading="lazy"
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

            <WishlistButton productId={product._id} />
        </article>
    );
};

export default ProductCard;