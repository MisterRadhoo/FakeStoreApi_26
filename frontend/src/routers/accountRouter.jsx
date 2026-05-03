import ProtectedRoutes from "../auth/ProtectedRoutes.jsx";

import UserAccount from "../components/dashboard/UserAccount.jsx";
import EditProfile from "../components/dashboard/EditProfile.jsx";
import ChangePassword from "../components/dashboard/ChangePassword.jsx";
import UserWishlist from "../components/dashboard/UserWishlist.jsx";


const accountRouter = [
    {
        path: "account",
        element: (
            <ProtectedRoutes>
                <UserAccount />
            </ProtectedRoutes>
        )
    },
    {
        path: "account/edit",
        element: (
            <ProtectedRoutes>
                <EditProfile />
            </ProtectedRoutes>
        )
    },
    {
        path: "account/change-password",
        element: (
            <ProtectedRoutes>
                <ChangePassword />
            </ProtectedRoutes>
        )
    },
    {
        path: "account/wishlist",
        element: (
            <ProtectedRoutes>
                <UserWishlist />
            </ProtectedRoutes>
        )
    }
];

export default accountRouter;