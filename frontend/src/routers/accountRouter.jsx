import ProtectedRoute from "../auth/ProtectedRoute.jsx";

import UserAccount from "../components/dashboard/UserAccount.jsx";
import EditProfile from "../components/dashboard/EditProfile.jsx";
import ChangePassword from "../components/dashboard/ChangePassword.jsx";
import UserWishlist from "../components/dashboard/UserWishlist.jsx";


const accountRouter = [
    {
        path: "account",
        element: (
            <ProtectedRoute>
                <UserAccount />
            </ProtectedRoute>
        )
    },
    {
        path: "account/edit",
        element: (
            <ProtectedRoute>
                <EditProfile />
            </ProtectedRoute>
        )
    },
    {
        path: "account/change-password",
        element: (
            <ProtectedRoute>
                <ChangePassword />
            </ProtectedRoute>
        )
    },
    {
        path: "account/wishlist",
        element: (
            <ProtectedRoute>
                <UserWishlist />
            </ProtectedRoute>
        )
    }
];

export default accountRouter;