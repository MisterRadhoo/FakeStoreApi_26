import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext.jsx";
import { useBootLoader } from "../hooks/useBootLoader.js";

const HomePage = () => {
    const { isAuthenticated, user } = useAuth();
    const { progress, visibleLines, bootComplete, bootLines } = useBootLoader(
        isAuthenticated,
        user
    );

    return (
        <div className="min-h-screen bg-[#efe3b0] text-slate-950 dark:bg-[#111827] dark:text-white">
            <main className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
                <section className="border-4 border-black bg-[#f3f4f6] p-6 shadow-[12px_12px_0px_#0f172a] dark:border-white dark:bg-[#1f2937] dark:shadow-[12px_12px_0px_#ffffff] md:p-10">
                    <div className="grid items-center gap-12 lg:grid-cols-2">
                        <div>
                            <p className="pixel-font mb-5 text-[10px] uppercase tracking-[0.28em] text-[#ff3b4a] dark:text-[#ff6b77] sm:text-xs">
                                Retro Store // Plug & Shop
                            </p>

                            <h1 className="pixel-font text-3xl leading-relaxed text-slate-950 dark:text-white sm:text-4xl lg:text-5xl">
                                WELCOME TO
                                <br />
                                MY SHOP
                            </h1>

                            <p className="pixel-font mt-8 max-w-2xl text-lg leading-8 text-slate-700 dark:text-slate-300">
                                {isAuthenticated && user && user.userName
                                    ? `Logged in as ${user.userName}`
                                    : "Fake Store API Retro & Pixel UI"}
                            </p>

                            <div className="mt-10 flex flex-wrap gap-4">
                                <Link
                                    to="/products"
                                    className="pixel-font border-4 border-black bg-[#7dd3fc] px-6 py-4 text-[10px] uppercase tracking-wider text-slate-950 shadow-[6px_6px_0px_#0f172a] transition hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[4px_4px_0px_#0f172a] dark:border-white dark:bg-cyan-300 dark:text-slate-950 dark:shadow-[6px_6px_0px_#ffffff] sm:text-xs"
                                >
                                    ENTER SHOP
                                </Link>

                                <a
                                    href="#shop-terminal"
                                    className="pixel-font border-4 border-cyan-300 bg-[#0f172a] px-6 py-4 text-[10px] uppercase tracking-wider text-green-400 shadow-[6px_6px_0px_#020617] transition hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[4px_4px_0px_#020617] dark:border-cyan-300 dark:bg-[#0b1220] dark:text-green-400 dark:shadow-[6px_6px_0px_#ffffff] sm:text-xs"
                                >
                                    {">"} RUN BOOT
                                </a>
                            </div>

                            <div className="mt-10 grid max-w-xl grid-cols-2 gap-4">
                                <div className="border-4 border-black bg-[#fef3c7] p-4 shadow-[5px_5px_0px_#0f172a] dark:border-white dark:bg-[#374151] dark:shadow-[5px_5px_0px_#ffffff]">
                                    <p className="pixel-font text-[10px] text-slate-950 dark:text-white sm:text-xs">
                                        STYLE
                                    </p>
                                    <p className="mt-3 text-sm text-slate-700 dark:text-slate-300 sm:text-base">
                                        Pixel retro UI
                                    </p>
                                </div>

                                <div className="border-4 border-black bg-[#fecdd3] p-4 shadow-[5px_5px_0px_#0f172a] dark:border-white dark:bg-[#4b5563] dark:shadow-[5px_5px_0px_#ffffff]">
                                    <p className="pixel-font text-[10px] text-slate-950 dark:text-white sm:text-xs">
                                        VIBE
                                    </p>
                                    <p className="mt-3 text-sm text-slate-700 dark:text-slate-300 sm:text-base">
                                        Terminal + arcade
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div
                            id="shop-terminal"
                            className="border-4 border-black bg-[#0f172a] p-5 text-white shadow-[10px_10px_0px_#1e293b] dark:border-white dark:bg-[#020617] dark:shadow-[10px_10px_0px_#ffffff]"
                        >
                            <div className="mb-5 flex items-center justify-between border-b-4 border-cyan-300 pb-4">
                                <p className="pixel-font text-[10px] uppercase tracking-[0.25em] text-cyan-300 sm:text-xs">
                                    SHOP TERMINAL
                                </p>

                                <p className="pixel-font text-[10px] text-slate-300 sm:text-xs">
                                    v1.0.0
                                </p>
                            </div>

                            <div className="space-y-4">
                                {bootLines.slice(0, visibleLines).map((line) => (
                                    <p
                                        key={line}
                                        className="pixel-font text-[10px] leading-6 text-green-400 sm:text-xs"
                                    >
                                        {">"} {line}
                                    </p>
                                ))}

                                {!bootComplete ? (
                                    <p className="pixel-font animate-pulse text-[10px] leading-6 text-yellow-300 sm:text-xs">
                                        {">"} BOOTING...
                                    </p>
                                ) : null}
                            </div>

                            <div className="mt-8">
                                <div className="mb-3 flex items-center justify-between">
                                    <span className="pixel-font text-[10px] text-slate-200 sm:text-xs">
                                        LOADING
                                    </span>

                                    <span className="pixel-font text-[10px] text-slate-200 sm:text-xs">
                                        {progress}%
                                    </span>
                                </div>

                                <div className="h-8 border-4 border-cyan-300 bg-slate-950 p-1">
                                    <div
                                        className="h-full bg-[#facc15] transition-all duration-100"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                            </div>

                            <div className="mt-8 min-h-35 border-2 border-dashed border-slate-500 bg-black/20 p-4">
                                {!bootComplete ? (
                                    <p className="pixel-font text-[10px] leading-6 text-slate-400 sm:text-xs">
                                        Awaiting welcome message...
                                    </p>
                                ) : (
                                    <div className="space-y-3">
                                        <p className="pixel-font text-[10px] leading-6 text-cyan-300 sm:text-xs">
                                            {">"} WELCOME TO MY SHOP
                                        </p>

                                        <p className="pixel-font text-[10px] leading-6 text-pink-300 sm:text-xs">
                                            {">"}{" "}
                                            {isAuthenticated && user && user.userName
                                                ? `WELCOME BACK ${user.userName.toUpperCase()}`
                                                : "GUEST MODE ACTIVE"}
                                        </p>

                                        <p className="pixel-font text-[10px] leading-6 text-yellow-300 sm:text-xs">
                                            {">"}{" "}
                                            {isAuthenticated
                                                ? "CONTINUE YOUR SHOPPING SESSION"
                                                : "START EXPLORING PRODUCTS"}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default HomePage;