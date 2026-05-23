import { lazy, Suspense } from "react";

import ProtectedRoutes from "../auth/ProtectedRoutes.jsx";

const UserAccount = lazy(() => import("../components/dashboard/UserAccount.jsx"));
const EditProfile = lazy(() => import("../components/dashboard/EditProfile.jsx"));
const ChangePassword = lazy(() => import("../components/dashboard/ChangePassword.jsx"));
const UserWishlist = lazy(() => import("../components/dashboard/UserWishlist.jsx"));

const pageLoader = (
    <div className="pixel-font flex min-h-[50vh] items-center justify-center text-sm">
        PLEASE WAIT TO LOAD ACCOUNT...
    </div>
);

const accountRouter = [
    {
        path: "account",
        element: (
            <ProtectedRoutes>
                <Suspense fallback={pageLoader}>
                    <UserAccount />
                </Suspense>
            </ProtectedRoutes>
        )
    },
    {
        path: "account/edit",
        element: (
            <ProtectedRoutes>
                <Suspense fallback={pageLoader}>
                    <EditProfile />
                </Suspense>
            </ProtectedRoutes>
        )
    },
    {
        path: "account/change-password",
        element: (
            <ProtectedRoutes>
                <Suspense fallback={pageLoader}>
                    <ChangePassword />
                </Suspense>
            </ProtectedRoutes>
        )
    },
    {
        path: "account/wishlist",
        element: (
            <ProtectedRoutes>
                <Suspense fallback={pageLoader}>
                    <UserWishlist />
                </Suspense>
            </ProtectedRoutes>
        )
    }
];

export default accountRouter;