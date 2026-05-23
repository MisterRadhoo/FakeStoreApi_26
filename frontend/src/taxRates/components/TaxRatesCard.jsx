const TaxRatesCard = ({ taxRate }) => {
    const vatRate = Number(taxRate.vatRate || 0) * 100;
    const shippingTaxRate = Number(taxRate.shippingTaxRate || 0);

    return (
        <article className="border-4 border-[#030712] bg-white p-6 shadow-[8px_8px_0_#030712] dark:border-white dark:bg-slate-900 dark:shadow-[8px_8px_0_#ffffff]">
            <div className="flex items-center justify-between gap-4">
                <h2 className="text-sm text-[#030712] dark:text-white">
                    {taxRate.country}
                </h2>

                <span className="border-4 border-[#030712] bg-red-300 px-3 py-2 text-[8px] text-[#030712] shadow-[3px_3px_0_#030712] dark:border-white dark:shadow-[3px_3px_0_#ffffff]">
                    {taxRate.acronymCode}
                </span>
            </div>

            <div className="mt-6 grid gap-4">
                <div className="border-4 border-[#030712] bg-[#fff1b8] p-4 dark:border-white dark:bg-[#1f2937]">
                    <p className="text-[8px] text-slate-600 dark:text-slate-300">
                        VAT RATE
                    </p>

                    <p className="mt-2 text-[11px] text-[#030712] dark:text-white">
                        {vatRate.toFixed(2)}%
                    </p>
                </div>

                <div className="border-4 border-[#030712] bg-[#fff1b8] p-4 dark:border-white dark:bg-[#1f2937]">
                    <p className="text-[8px] text-slate-600 dark:text-slate-300">
                        SHIPPING TAX RATE
                    </p>

                    <p className="mt-2 text-[11px] text-[#030712] dark:text-white">
                        ${shippingTaxRate.toFixed(2)}
                    </p>
                </div>
            </div>
        </article>
    );
};

export default TaxRatesCard;