import { Outlet } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

const AppLayout = () => {
    return (
        <div className="flex min-h-screen flex-col bg-[#f8ecb8] dark:bg-[#07101f]">
            <Navbar />

            <div className="flex-1">
                <Outlet />
            </div>

            <Footer />
        </div>
    );
};

export default AppLayout;