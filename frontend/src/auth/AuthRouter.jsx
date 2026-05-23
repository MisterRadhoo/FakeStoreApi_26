import { lazy, Suspense } from "react";

const LoginPage = lazy(() => import("../pages/LoginPage.jsx"));
const RegisterPage = lazy(() => import("../pages/RegisterPage.jsx"));

const pageLoader = (
    <div className="pixel-font flex min-h-[50vh] items-center justify-center text-sm">
        PLEASE WAIT TO LOAD PAGE...
    </div>
);

const authRouter = [
    {
        path: "auth/login",
        element: (
            <Suspense fallback={pageLoader}>
                <LoginPage />
            </Suspense>
        )
    },
    {
        path: "auth/register",
        element: (
            <Suspense fallback={pageLoader}>
                <RegisterPage />
            </Suspense >
        )
    }
];

export default authRouter;