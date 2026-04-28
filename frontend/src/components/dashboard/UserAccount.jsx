import { Link } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext.jsx";
import { useWishlist } from "../../wishlist/WishlistContext.jsx";

const UserAccount = () => {
    const { user } = useAuth();
    const { wishlistCount } = useWishlist();

    const infoCardClass =
        "border-4 border-slate-950 bg-[#fff7d6] p-5 shadow-[4px_4px_0_#020617]";

    const statCardClass =
        "border-4 border-slate-950 p-5 text-center shadow-[4px_4px_0_#020617]";

    const actionLinkClass =
        "pixel-font flex min-h-14 items-center justify-center border-4 border-slate-950 px-4 py-4 text-center text-xs font-black uppercase text-slate-950 shadow-[5px_5px_0_#020617] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none";

    return (
        <main className="min-h-screen bg-[#f8e7b8] px-6 py-14">
            <section className="mx-auto max-w-4xl border-4 border-slate-950 bg-white p-8 shadow-[10px_10px_0_#020617]">
                <h1 className="pixel-font mb-10 text-center text-xl font-black uppercase tracking-widest text-slate-950">
                    My Account
                </h1>
                <p className="pixel-font mb-8 text-center text-sm font-black text-slate-950">
                    Welcome, {user.userName}
                </p>

                <div className="mb-8 grid gap-5 md:grid-cols-2">
                    <div className={infoCardClass}>
                        <p className="pixel-font text-xs font-black uppercase text-slate-500">
                            Username
                        </p>
                        <p className="pixel-font mt-3 text-sm font-black text-slate-950">
                            {user.userName}
                        </p>
                    </div>

                    <div className={infoCardClass}>
                        <p className="pixel-font text-xs font-black uppercase text-slate-500">
                            Email
                        </p>
                        <p className="pixel-font mt-3 break-all text-sm font-black text-slate-950">
                            {user.email}
                        </p>
                    </div>

                    <div className={infoCardClass}>
                        <p className="pixel-font text-xs font-black uppercase text-slate-500">
                            Full name
                        </p>
                        <p className="pixel-font mt-3 text-sm font-black text-slate-950">
                            {user.fullName || "Not set"}
                        </p>
                    </div>

                    <div className={infoCardClass}>
                        <p className="pixel-font text-xs font-black uppercase text-slate-500">
                            Role
                        </p>
                        <p className="pixel-font mt-3 text-sm font-black uppercase text-slate-950">
                            {user.role}
                        </p>
                    </div>
                </div>

                <div className="mx-auto mb-8 grid max-w-2xl gap-5 md:grid-cols-2">
                    <div className={`${statCardClass} bg-blue-100`}>
                        <p className="pixel-font text-xs font-black uppercase text-slate-500">
                            Wishlist items
                        </p>
                        <p className="pixel-font mt-3 text-xl font-black text-slate-950">
                            {wishlistCount}
                        </p>
                    </div>

                    <div className={`${statCardClass} bg-green-100`}>
                        <p className="pixel-font text-xs font-black uppercase text-slate-500">
                            Addresses
                        </p>
                        <p className="pixel-font mt-3 text-xl font-black text-slate-950">
                            {user.addresses ? user.addresses.length : 0}
                        </p>
                    </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                    <Link
                        to="/account/edit"
                        className={`${actionLinkClass} bg-blue-300`}
                    >
                        Edit Profile
                    </Link>

                    <Link
                        to="/account/change-password"
                        className={`${actionLinkClass} bg-red-300`}
                    >
                        Change Password
                    </Link>

                    <Link
                        to="/account/wishlist"
                        className={`${actionLinkClass} bg-pink-300`}
                    >
                        Wishlist
                    </Link>

                    <Link
                        to="/account/addresses"
                        className={`${actionLinkClass} bg-yellow-300`}
                    >
                        Addresses
                    </Link>

                    <Link
                        to="/account/cart"
                        className={`${actionLinkClass} bg-green-300`}
                    >
                        Cart
                    </Link>

                    <Link
                        to="/account/orders"
                        className={`${actionLinkClass} bg-purple-300`}
                    >
                        Orders
                    </Link>
                </div>
            </section>
        </main>
    );
};

export default UserAccount;