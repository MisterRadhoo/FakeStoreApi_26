import LoginPage from "../pages/LoginPage.jsx";
import RegisterPage from "../pages/RegisterPage.jsx";

const authRouter = [
    {
        path: "auth/login",
        element: <LoginPage />
    },
    {
        path: "auth/register",
        element: <RegisterPage />
    }
];

export default authRouter;