import { useEffect, useState } from "react";

import { getTaxRates } from "../taxRatesApi.js";

export const useTaxRates = () => {
    const [taxRates, setTaxRates] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasTaxRatesError, setHasTaxRatesError] = useState(false);

    const loadTaxRates = async () => {
        return getTaxRates()
            .then((response) => {
                setTaxRates(response.data || []);
                setHasTaxRatesError(false);
            })
            .catch(() => {
                setTaxRates([]);
                setHasTaxRatesError(true);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    useEffect(() => {
        loadTaxRates();

        const intervalId = setInterval(() => {
            loadTaxRates();
        }, 5000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return {
        taxRates,
        isLoading,
        hasTaxRatesError
    };
};