import { Link } from "react-router-dom";
import { MessageSquareText, ReceiptText, ShieldAlert } from "lucide-react";

const Footer = () => {
    const footerLinkClass =
        "flex items-center gap-2 border-4 border-slate-950 bg-[#8cc7ff] px-5 py-3 text-[9px] font-black uppercase tracking-[0.18em] text-slate-950 shadow-[4px_4px_0_0_#0f172a] transition-all hover:translate-x-1 hover:translate-y-1 hover:bg-yellow-300 hover:shadow-none dark:border-white dark:bg-blue-700 dark:text-white dark:shadow-[4px_4px_0_0_#ffffff] dark:hover:bg-slate-700";

    return (
        <footer className="pixel-font border-t-4 border-slate-950 bg-[#f8e7b8] dark:border-white dark:bg-[#111827]">
            <div className="mx-auto max-w-7xl px-6 py-6">
                <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                    <Link to="/" className="flex items-center gap-4">
                        <span className="flex h-12 w-12 items-center justify-center border-4 border-slate-950 bg-red-300 text-[11px] font-black text-slate-950 shadow-[4px_4px_0_0_#0f172a] dark:border-white dark:shadow-[4px_4px_0_0_#ffffff]">
                            FS
                        </span>

                        <h2 className="text-xs font-black uppercase tracking-[0.18em] text-slate-950 dark:text-white">
                            FAKESTORE API
                        </h2>
                    </Link>

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                        <Link to="/reviews" className={footerLinkClass}>
                            <MessageSquareText className="h-4 w-4 stroke-3" />
                            VIEW ALL REVIEWS
                        </Link>

                        <Link to="/blacklist" className={footerLinkClass}>
                            <ShieldAlert className="h-4 w-4 stroke-3" />
                            BLACKLISTED USERS
                        </Link>

                        <Link to="/taxrates" className={footerLinkClass}>
                            <ReceiptText className="h-4 w-4 stroke-3" />
                            TAX RATES LIST
                        </Link>


                    </div>
                </div>

                <div className="mt-5 text-center">
                    <p className="text-[8px] font-black leading-4 text-slate-950 drop-shadow-[1px_1px_0_#ffffff] dark:text-white dark:drop-shadow-[1px_1px_0_#0f172a]">
                        Retro Pixel e-commerce interface.
                    </p>

                    <p className="mt-1 text-[8px] font-black leading-4 text-slate-950 drop-shadow-[1px_1px_0_#ffffff] dark:text-white dark:drop-shadow-[1px_1px_0_#0f172a]">
                        © {new Date().getFullYear()} FakeStore API. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;