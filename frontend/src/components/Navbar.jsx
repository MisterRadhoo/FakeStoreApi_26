import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext.jsx";
import { useWishlist } from "../wishlist/WishlistContext.jsx";
import ThemeToggle from "./ThemeToggle.jsx";

const Navbar = () => {
    const navigate = useNavigate();
    const { isAuthenticated, logout } = useAuth();
    const { wishlistCount } = useWishlist();

    const navLinkClass =
        "border-4 border-slate-950 bg-[#fff7d6] px-4 py-3 text-[10px] font-black uppercase tracking-widest text-slate-950 shadow-[4px_4px_0_0_#0f172a] transition-all hover:translate-x-1 hover:translate-y-1 hover:bg-yellow-300 hover:shadow-none dark:border-white dark:bg-slate-800 dark:text-white dark:shadow-[4px_4px_0_0_#ffffff] dark:hover:bg-slate-700";

    const authLinkClass =
        "border-4 border-slate-950 px-5 py-3 text-[10px] font-black uppercase tracking-widest text-slate-950 shadow-[5px_5px_0_0_#0f172a] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none dark:border-white dark:text-white dark:shadow-[5px_5px_0_0_#ffffff]";

    const handleLogout = async () => {
        await logout();
        navigate("/auth/login");
    };

    return (
        <header className="pixel-font border-b-4 border-slate-950 bg-[#f8e7b8] dark:border-white dark:bg-[#111827]">
            <nav className="mx-auto flex min-h-24 max-w-7xl flex-wrap items-center justify-between gap-5 px-6 py-4">
                <Link to="/" className="flex items-center gap-4">
                    <span className="flex h-14 w-14 items-center justify-center border-4 border-slate-950 bg-red-300 text-[11px] font-black text-slate-950 shadow-[5px_5px_0_0_#0f172a] dark:border-white dark:shadow-[5px_5px_0_0_#ffffff]">
                        FS
                    </span>

                    <div>
                        <p className="mb-2 text-[7px] font-black uppercase tracking-[0.35em] text-red-500">
                            Retro Store
                        </p>

                        <h1 className="text-base font-black uppercase tracking-[0.18em] text-slate-950 dark:text-white">
                            FakeStore API
                        </h1>
                    </div>
                </Link>

                <div className="hidden items-center gap-4 md:flex">
                    <Link to="/" className={navLinkClass}>
                        Home
                    </Link>

                    <Link to="/products" className={navLinkClass}>
                        Products
                    </Link>

                    <Link to="/account/wishlist" className={navLinkClass}>
                        Wishlist ({wishlistCount})
                    </Link>
                </div>

                <div className="flex items-center gap-3">
                    <ThemeToggle />

                    {isAuthenticated ? (
                        <>
                            <Link
                                to="/account"
                                className={`${authLinkClass} bg-blue-300 hover:bg-pink-300 dark:bg-blue-700 dark:hover:bg-pink-700`}
                            >
                                Account
                            </Link>

                            <button
                                type="button"
                                onClick={handleLogout}
                                className={`${authLinkClass} bg-white hover:bg-red-300 dark:bg-slate-800 dark:hover:bg-red-700`}
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/auth/login"
                                className={`${authLinkClass} bg-white hover:bg-green-300 dark:bg-slate-800 dark:hover:bg-green-700`}
                            >
                                Login
                            </Link>

                            <Link
                                to="/auth/register"
                                className={`${authLinkClass} bg-blue-300 hover:bg-pink-300 dark:bg-blue-700 dark:hover:bg-pink-700`}
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Navbar;