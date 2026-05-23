import { lazy, Suspense } from "react";

const TaxRatesPage = lazy(() => import("./pages/TaxRatesPage.jsx"));

const pageLoader = (
    <div className="pixel-font flex min-h-[50vh] items-center justify-center text-sm">
        PLEASE WAIT TO LOAD TAX RATES...
    </div>
);

const taxRatesRouter = [
    {
        path: "taxrates",
        element: (
            <Suspense fallback={pageLoader}>
                <TaxRatesPage />
            </Suspense>
        )
    }
];

export default taxRatesRouter;