import { Link } from "react-router-dom";
import { useWishlist } from "../../wishlist/WishlistContext.jsx";

const UserWishlist = () => {
    const { wishlist, isWishlistLoading, removeFromWishlist } = useWishlist();

    const actionLinkClass =
        "pixel-font flex min-h-12 items-center justify-center border-4 border-slate-950 px-4 py-3 text-center text-xs font-black uppercase text-slate-950 shadow-[4px_4px_0_#020617] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none";

    return (
        <main className="min-h-screen bg-[#f8e7b8] px-6 py-14">
            <section className="mx-auto max-w-4xl border-4 border-slate-950 bg-white p-8 shadow-[10px_10px_0_#020617]">
                <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                    <h1 className="pixel-font text-center text-xl font-black uppercase tracking-widest text-slate-950 md:text-left">
                        My Wishlist
                    </h1>

                    <Link
                        to="/account"
                        className={`${actionLinkClass} bg-blue-300`}
                    >
                        Back to Account
                    </Link>
                </div>

                {isWishlistLoading ? (
                    <p className="pixel-font text-center text-sm font-black uppercase text-slate-950">
                        Loading wishlist...
                    </p>
                ) : wishlist.length === 0 ? (
                    <div className="border-4 border-slate-950 bg-[#fff7d6] p-8 text-center shadow-[5px_5px_0_#020617]">
                        <p className="pixel-font text-sm font-black uppercase text-slate-950">
                            Your wishlist is empty
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-5">
                        {wishlist.map((product) => (
                            <article
                                key={product._id}
                                className="grid gap-5 border-4 border-slate-950 bg-[#fff7d6] p-5 shadow-[5px_5px_0_#020617] md:grid-cols-[120px_1fr_auto] md:items-center"
                            >
                                <Link to={`/products/${product._id}`}>
                                    <img
                                        src={product.imageCover}
                                        alt={product.title}
                                        className="h-28 w-28 border-4 border-slate-950 bg-white object-contain p-1 shadow-[3px_3px_0_#020617]"
                                    />
                                </Link>

                                <div>
                                    <h2 className="pixel-font text-sm font-black uppercase text-slate-950">
                                        {product.title}
                                    </h2>

                                    <p className="pixel-font mt-3 text-xs font-black uppercase text-slate-500">
                                        {product.price} {product.currency}
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => removeFromWishlist(product._id)}
                                    className={`${actionLinkClass} bg-red-300`}
                                >
                                    Remove
                                </button>
                            </article>
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
};

export default UserWishlist;