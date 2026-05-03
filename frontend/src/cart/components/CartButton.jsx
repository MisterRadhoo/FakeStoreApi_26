import { Link } from "react";
import { userCart } from "../CartContext.jsx";

const CartButton = () => {
    const { itemsCount } = useCart();

    return (
        <Link
            to="/cart"
            className="pixel-font border-4 border-black bg-white px-4 py-3 text-xs shadow-[6px_6px_0_#000] dark:bg-slate-900 dark:text-white"
        >
            CART ({itemsCount})
        </Link>
    );
};

export default CartButton;