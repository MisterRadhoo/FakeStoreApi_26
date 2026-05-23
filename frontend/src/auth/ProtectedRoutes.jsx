import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext.jsx";
import Forbidden from "../components/Forbidden.jsx";

const ProtectedRoutes = ({ children, allowedTo }) => {
    const { user, isAuthenticated, isAuthLoading } = useAuth();

    if (isAuthLoading) {
        return (
            <main className="min-h-screen bg-[#f8e7b8] px-6 py-16">
                <h1 className="pixel-font text-center text-sm font-black uppercase text-slate-950">
                    Checking authentication...
                </h1>
            </main>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/auth/login" replace />;
    }

    if (
        Array.isArray(allowedTo) &&
        allowedTo.length > 0 &&
        (!user || !allowedTo.includes(user.role))
    ) {
        return <Forbidden />;
    }

    return children;
};

export default ProtectedRoutes;



