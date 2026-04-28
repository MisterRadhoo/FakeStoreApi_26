import { createContext, useContext, useEffect, useState } from "react";
import { registerUser, loginUser, logoutUser, getMe } from "./authApi";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthLoading, setIsAuthLoading] = useState(true);

    useEffect(() => {
        getMe()
            .then((response) => {
                setUser(response.data.userInfo);
            })
            .catch(() => {
                setUser(null);
            })
            .finally(() => {
                setIsAuthLoading(false);
            });
    }, []);

    const register = async (userData) => {
        const response = await registerUser(userData);
        return response;
    };

    const login = async (credentials) => {
        const response = await loginUser(credentials);
        setUser(response.data.data);
        return response;
    };

    const logout = async () => {
        await logoutUser();
        setUser(null);
    };

    const updateCurrentUser = (updatedUser) => {
        setUser(updatedUser);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: Boolean(user),
                isAuthLoading,
                register,
                login,
                logout,
                updateCurrentUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider!");
    }
    return context
};