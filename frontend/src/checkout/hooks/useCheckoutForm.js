import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../../order/orderApi.js";
import { getTaxRates } from "../../taxRates/taxRatesApi.js";
import { getErrorMessage } from "../../utils/utils.js";
import { useCart } from "../../cart/CartContext.jsx";

const initialShippingAddress = {
    details: "",
    country: "",
    city: "",
    street: "",
    postalCode: "",
    phone: ""
};

export const useCheckoutForm = () => {
    const navigate = useNavigate();
    const { refreshCart } = useCart();

    const [shippingAddress, setShippingAddress] = useState(initialShippingAddress);
    const [countryOptions, setCountryOptions] = useState([]);
    const [isLoadingCountries, setIsLoadingCountries] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        const loadCountries = async () => {
            setIsLoadingCountries(true);

            try {
                const response = await getTaxRates();

                const taxRates = response && response.data ? response.data : [];

                setCountryOptions(
                    taxRates.map((item) => ({
                        country: item.country,
                        acronymCode: item.acronymCode
                    }))
                );
            } catch (error) {
                setError(getErrorMessage(error, "Failed to load shipping countries!"));
            } finally {
                setIsLoadingCountries(false);
            }
        };

        loadCountries();
    }, []);

    const handleChange = (event) => {
        setShippingAddress((prev) => ({
            ...prev,
            [event.target.name]: event.target.value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setError("");
        setSuccessMessage("");
        setIsSubmitting(true);

        try {
            await createOrder({ shippingAddress });
            await refreshCart();
            setSuccessMessage("ORDER CREATED SUCCESSFULLY!");

            setTimeout(() => {
                navigate("/account");
            }, 1200);
        } catch (error) {
            setError(getErrorMessage(error, "Checkout failed!"));
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        shippingAddress,
        countryOptions,
        isLoadingCountries,
        isSubmitting,
        error,
        successMessage,
        handleChange,
        handleSubmit
    };
};