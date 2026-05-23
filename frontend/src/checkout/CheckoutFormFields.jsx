const fieldClass =
    "pixel-font border-4 border-black bg-[#fff6cc] px-4 py-3 text-[10px] normal-case text-black outline-none disabled:cursor-not-allowed disabled:opacity-60 dark:border-white dark:bg-slate-950 dark:text-white";

const labelClass = "pixel-font text-[10px] uppercase";

const TextField = ({
    id,
    name,
    label,
    type = "text",
    value,
    onChange,
    autoComplete,
    inputMode,
    className = ""
}) => {
    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            <label htmlFor={id} className={labelClass}>
                {label}
            </label>

            <input
                id={id}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                autoCapitalize="none"
                autoComplete={autoComplete}
                inputMode={inputMode}
                required
                className={fieldClass}
            />
        </div>
    );
};

const CheckoutFormFields = ({
    shippingAddress,
    countryOptions,
    isLoadingCountries,
    handleChange
}) => {
    return (
        <>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                    <label htmlFor="country" className={labelClass}>
                        COUNTRY
                    </label>

                    <select
                        id="country"
                        name="country"
                        value={shippingAddress.country}
                        onChange={handleChange}
                        disabled={isLoadingCountries}
                        required
                        autoComplete="country-name"
                        className={fieldClass}
                    >
                        <option value="">
                            {isLoadingCountries ? "LOADING COUNTRIES..." : "SELECT COUNTRY"}
                        </option>

                        {countryOptions.map((countryOption) => (
                            <option
                                key={countryOption.acronymCode}
                                value={countryOption.country}
                            >
                                {countryOption.country}
                            </option>
                        ))}
                    </select>
                </div>

                <TextField
                    id="city"
                    name="city"
                    label="CITY"
                    value={shippingAddress.city}
                    onChange={handleChange}
                    autoComplete="address-level2"
                />

                <TextField
                    id="street"
                    name="street"
                    label="STREET"
                    value={shippingAddress.street}
                    onChange={handleChange}
                    autoComplete="street-address"
                    className="md:col-span-2"
                />

                <TextField
                    id="postalCode"
                    name="postalCode"
                    label="POSTAL CODE"
                    value={shippingAddress.postalCode}
                    onChange={handleChange}
                    autoComplete="postal-code"
                    inputMode="numeric"
                />

                <TextField
                    id="phone"
                    name="phone"
                    label="PHONE"
                    type="tel"
                    value={shippingAddress.phone}
                    onChange={handleChange}
                    autoComplete="tel"
                    inputMode="tel"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="details" className={labelClass}>
                    DETAILS
                </label>

                <textarea
                    id="details"
                    name="details"
                    value={shippingAddress.details}
                    onChange={handleChange}
                    autoCapitalize="none"
                    autoComplete="off"
                    required
                    className={`${fieldClass} min-h-32 resize-y`}
                />
            </div>
        </>
    );
};

export default CheckoutFormFields;