import { lazy, Suspense } from "react";
import ProtectedRoutes from "../auth/ProtectedRoutes.jsx";

const BlackListPage = lazy(() => import("./pages/BlackListPage.jsx"));

const pageLoader = (
    <div className="pixel-font flex min-h-[50vh] items-center justify-center text-sm">
        PLEASE WAIT TO LOAD BLACKLIST...
    </div>
);

const blackListRouter = [
    {
        path: "blacklist",
        element: (
            <ProtectedRoutes allowedTo={["admin"]}>
                <Suspense fallback={pageLoader}>
                    <BlackListPage />
                </Suspense>
            </ProtectedRoutes>
        )
    }
];

export default blackListRouter;