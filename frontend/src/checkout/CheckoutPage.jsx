import { Link } from "react-router-dom";

import { useCheckoutForm } from "./hooks/useCheckoutForm.js";
import CheckoutFormFields from "./CheckoutFormFields.jsx";

const CheckoutPage = () => {
    const {
        shippingAddress,
        countryOptions,
        isLoadingCountries,
        isSubmitting,
        error,
        successMessage,
        handleChange,
        handleSubmit
    } = useCheckoutForm();

    return (
        <main className="pixel-font min-h-screen bg-[#fff1b8] px-6 py-16 text-[#030712] dark:bg-[#111827] dark:text-white">
            <section className="mx-auto max-w-5xl border-4 border-[#030712] bg-white p-8 shadow-[12px_12px_0_#030712] dark:border-white dark:bg-[#1f2937] dark:shadow-[12px_12px_0_#ffffff]">
                <div className="mb-10 text-center">
                    <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#ff3040]">
                        RETRO STORE // CHECKOUT MODULE
                    </p>

                    <h1 className="mt-8 text-3xl text-[#ff3040] drop-shadow-[4px_4px_0_#030712] dark:drop-shadow-[4px_4px_0_#ffffff] md:text-4xl">
                        CHECKOUT
                    </h1>

                    <div className="mt-8">
                        <Link
                            to="/cart"
                            className="inline-flex items-center justify-center border-4 border-[#030712] bg-[#8cc7ff] px-4 py-3 text-[10px] font-black uppercase text-[#030712] shadow-[5px_5px_0_#030712] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none dark:border-white dark:bg-blue-700 dark:text-white dark:shadow-[5px_5px_0_#ffffff]"
                        >
                            BACK TO CART
                        </Link>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <CheckoutFormFields
                        shippingAddress={shippingAddress}
                        countryOptions={countryOptions}
                        isLoadingCountries={isLoadingCountries}
                        handleChange={handleChange}
                    />

                    {error ? (
                        <div className="border-4 border-[#030712] bg-[#ff9aa2] px-6 py-4 shadow-[5px_5px_0_#030712] dark:border-white dark:bg-red-700 dark:shadow-[5px_5px_0_#ffffff]">
                            <p className="text-[10px] font-black leading-6 text-[#030712] dark:text-white">
                                {error}
                            </p>
                        </div>
                    ) : null}

                    {successMessage ? (
                        <div className="border-4 border-[#030712] bg-green-300 px-6 py-4 shadow-[5px_5px_0_#030712] dark:border-white dark:bg-green-700 dark:shadow-[5px_5px_0_#ffffff]">
                            <p className="text-[10px] font-black leading-6 text-[#030712] dark:text-white">
                                {successMessage}
                            </p>
                        </div>
                    ) : null}

                    <button
                        type="submit"
                        disabled={isSubmitting || isLoadingCountries}
                        className="border-4 border-[#030712] bg-green-300 px-4 py-4 text-xs font-black uppercase text-[#030712] shadow-[6px_6px_0_#030712] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[6px_6px_0_#030712] dark:border-white dark:bg-green-700 dark:text-white dark:shadow-[6px_6px_0_#ffffff] dark:disabled:hover:shadow-[6px_6px_0_#ffffff]"
                    >
                        {isSubmitting ? "PLACING ORDER..." : "PLACE ORDER"}
                    </button>
                </form>
            </section>
        </main>
    );
};

export default CheckoutPage;