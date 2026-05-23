import { Link } from "react-router-dom";

import NavbarLinks from "./NavbarLinks.jsx";

const Navbar = () => {
    return (
        <header className="pixel-font border-b-4 border-slate-950 bg-[#f8e7b8] dark:border-white dark:bg-[#111827]">
            <nav className="mx-auto grid min-h-24 max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-8 px-6 py-4">
                <Link to="/" className="flex shrink-0 items-center gap-4">
                    <span className="flex h-14 w-14 items-center justify-center border-4 border-slate-950 bg-red-300 text-[11px] font-black text-slate-950 shadow-[5px_5px_0_0_#0f172a] dark:border-white dark:shadow-[5px_5px_0_0_#ffffff]">
                        FS
                    </span>

                    <h1 className="text-base font-black uppercase tracking-[0.18em] text-slate-950 dark:text-white">
                        FakeStore API
                    </h1>
                </Link>

                <NavbarLinks />
            </nav>
        </header>
    );
};

export default Navbar;