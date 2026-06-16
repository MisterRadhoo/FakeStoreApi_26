import { Link, useNavigate } from "react-router-dom";
import {
    Heart, Home, LogIn, LogOut, Moon, Package, ShoppingCart, User, UserPlus
} from "lucide-react";

import { useAuth } from "../auth/AuthContext.jsx";
import { useWishlist } from "../wishlist/WishlistContext.jsx";
import { useCart } from "../cart/CartContext.jsx";
import { useTheme } from "../theme/ThemeContext.jsx";

const NavbarLinks = () => {
    const navigate = useNavigate();

    const { isAuthenticated, logout } = useAuth();
    const { wishlistCount } = useWishlist();
    const { itemsCount } = useCart();
    const { toggleTheme } = useTheme();

    const textButtonClass =
        "flex items-center gap-2 border-4 border-slate-950 bg-[#fff7d6] px-5 py-3 text-[10px] font-black uppercase tracking-widest text-slate-950 shadow-[4px_4px_0_0_#0f172a] transition-all hover:translate-x-1 hover:translate-y-1 hover:bg-yellow-300 hover:shadow-none dark:border-white dark:bg-slate-800 dark:text-white dark:shadow-[4px_4px_0_0_#ffffff] dark:hover:bg-slate-700";

    const iconButtonClass =
        "relative flex h-14 w-14 items-center justify-center border-4 border-slate-950 text-slate-950 shadow-[4px_4px_0_0_#0f172a] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none dark:border-white dark:text-white dark:shadow-[4px_4px_0_0_#ffffff]";

    const iconClass = "h-5 w-5 stroke-[3]";
    const smallIconClass = "h-4 w-4 stroke-[3]";

    const handleLogout = async () => {
        await logout();
        navigate("/auth/login");
    };

    // const handleToggleTheme = () => {
    //     document.documentElement.classList.toggle("dark");
    // };

    return (
        <>
            <div className="flex items-center justify-start gap-4">
                <Link to="/" className={textButtonClass}>
                    <Home className={smallIconClass} />
                    Home
                </Link>

                <Link to="/products" className={textButtonClass}>
                    <Package className={smallIconClass} />
                    Products
                </Link>
            </div>

            <div className="flex items-center justify-end gap-3">
                <Link
                    to="/account/wishlist"
                    title="Wishlist"
                    aria-label="Wishlist"
                    className={`${iconButtonClass} bg-[#ff8fa3] hover:bg-[#ff5f7e] dark:bg-[#7f1d1d] dark:hover:bg-[#991b1b]`}
                >
                    <Heart className={iconClass} />

                    <span className="absolute -right-3 -top-3 flex h-7 min-w-7 items-center justify-center border-4 border-slate-950 bg-[#fff7d6] px-1 text-[8px] font-black text-slate-950 dark:border-white dark:bg-slate-900 dark:text-white">
                        {wishlistCount}
                    </span>
                </Link>

                {/* Link to user logged Cart  */}
                <Link
                    to="/cart"
                    title="Cart"
                    aria-label="Cart"
                    className={`${iconButtonClass} bg-[#ffd84d] hover:bg-[#ffcc00] dark:bg-[#92400e] dark:hover:bg-[#b45309]`}
                >
                    <ShoppingCart className={iconClass} />

                    <span className="absolute -right-3 -top-3 flex h-7 min-w-7 items-center justify-center border-4 border-slate-950 bg-[#fff7d6] px-1 text-[8px] font-black text-slate-950 dark:border-white dark:bg-slate-900 dark:text-white">
                        {itemsCount}
                    </span>
                </Link>

                <button
                    type="button"
                    title="Toggle theme"
                    aria-label="Toggle theme"
                    onClick={toggleTheme}
                    className={`${iconButtonClass} bg-[#8cc7ff] hover:bg-yellow-300 dark:bg-blue-700 dark:hover:bg-slate-700`}
                >
                    <Moon className={iconClass} />
                </button>

                {isAuthenticated ? (
                    <>
                        <Link
                            to="/account"
                            title="Account"
                            aria-label="Account"
                            className={`${iconButtonClass} bg-blue-300 hover:bg-pink-300 dark:bg-blue-700 dark:hover:bg-pink-700`}
                        >
                            <User className={iconClass} />
                        </Link>

                        <button
                            type="button"
                            title="Logout"
                            aria-label="Logout"
                            onClick={handleLogout}
                            className={`${iconButtonClass} bg-white hover:bg-red-300 dark:bg-slate-800 dark:hover:bg-red-700`}
                        >
                            <LogOut className={iconClass} />
                        </button>
                    </>
                ) : (
                    <>
                        <Link
                            to="/auth/login"
                            title="Login"
                            aria-label="Login"
                            className={`${iconButtonClass} bg-white hover:bg-green-300 dark:bg-slate-800 dark:hover:bg-green-700`}
                        >
                            <LogIn className={iconClass} />
                        </Link>

                        <Link
                            to="/auth/register"
                            title="Register"
                            aria-label="Register"
                            className={`${iconButtonClass} bg-blue-300 hover:bg-pink-300 dark:bg-blue-700 dark:hover:bg-pink-700`}
                        >
                            <UserPlus className={iconClass} />
                        </Link>
                    </>
                )}
            </div>
        </>
    );
};

export default NavbarLinks;