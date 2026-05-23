import TaxRatesCard from "../components/TaxRatesCard.jsx";
import { useTaxRates } from "../hooks/useTaxRates.js";

const TaxRatesPage = () => {
    const { taxRates, isLoading } = useTaxRates();

    return (
        <main className="pixel-font min-h-screen bg-[#fff1b8] px-6 py-16 text-[#030712] dark:bg-[#111827] dark:text-white">
            <section className="mx-auto max-w-7xl border-4 border-[#030712] bg-white p-8 shadow-[12px_12px_0_#030712] dark:border-white dark:bg-[#1f2937] dark:shadow-[12px_12px_0_#ffffff]">
                <div className="mb-10 text-center">
                    <h1 className="mb-10 text-center text-3xl text-[#ff3040] drop-shadow-[4px_4px_0_#030712] dark:drop-shadow-[4px_4px_0_#ffffff]">
                        TAX RATES
                    </h1>

                    <p className="mx-auto max-w-3xl text-[12px] font-black leading-5 text-slate-950 drop-shadow-[1px_1px_0_#ffffff] dark:text-slate-300 dark:drop-shadow-[1px_1px_0_#0f172a]">
                        VAT and shipping tax configuration used for orders.
                    </p>

                    <p className="mt-6 inline-block border-4 border-[#030712] bg-[#fff1b8] px-5 py-3 text-[9px] font-black text-[#030712] shadow-[5px_5px_0_#030712] dark:border-white dark:bg-blue-700 dark:text-white dark:shadow-[5px_5px_0_#ffffff]">
                        TOTAL TAX RATES: {taxRates.length}
                    </p>
                </div>

                {isLoading ? (
                    <p className="mt-10 text-center text-[10px] text-[#030712] dark:text-white">
                        LOADING TAX RATES...
                    </p>
                ) : taxRates.length === 0 ? (
                    <p className="mt-10 text-center text-[10px] text-[#030712] dark:text-white">
                        NO TAX RATES FOUND.
                    </p>
                ) : (
                    <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {taxRates.map((taxRate) => (
                            <TaxRatesCard
                                key={taxRate._id}
                                taxRate={taxRate}
                            />
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
};

export default TaxRatesPage;