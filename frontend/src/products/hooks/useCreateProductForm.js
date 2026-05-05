import { useEffect, useState } from "react";
import { createProduct } from "../productsApi.js";
import { getCategories } from "../../category/categoryApi.js";
import { getSubCategories } from "../../subcategory/subCategoryApi.js";
import { getBrands } from "../../brand/brandApi.js";
import { getErrorMessage } from "../../utils/utils.js";

const initialFormData = {
    title: "",
    price: "",
    currency: "USD",
    stock: "",
    description: "",
    categoryId: "",
    subcategoriesIds: [],
    brandId: "",
    imageCover: "",
    images: "",
    colors: ""
};

export const useCreateProductForm = () => {
    const [formData, setFormData] = useState(initialFormData);
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [isLoadingRefs, setIsLoadingRefs] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        const loadRefs = async () => {
            setIsLoadingRefs(true);
            setError("");

            try {
                const [categoriesData, subCategoriesData, brandsData] = await Promise.all([
                    getCategories(),
                    getSubCategories(),
                    getBrands()
                ]);

                setCategories(categoriesData && categoriesData.data ? categoriesData.data : []);
                setSubCategories(subCategoriesData && subCategoriesData.data ? subCategoriesData.data : []);
                setBrands(brandsData && brandsData.data ? brandsData.data : []);
            } catch (err) {
                setError(getErrorMessage(err, "Failed to load form data."));
            } finally {
                setIsLoadingRefs(false);
            }
        };

        loadRefs();
    }, []);

    const handleChange = (event) => {
        setFormData((prev) => ({
            ...prev,
            [event.target.name]: event.target.value
        }));
    };

    const handleSubcategoriesChange = (event) => {
        const selectedValues = Array.from(
            event.target.selectedOptions,
            (option) => option.value
        );

        setFormData((prev) => ({
            ...prev,
            subcategoriesIds: selectedValues
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        setError("");
        setSuccessMessage("");

        try {
            const payload = {
                title: formData.title,
                price: Number(formData.price),
                currency: formData.currency,
                stock: Number(formData.stock),
                description: formData.description,
                categoryId: formData.categoryId,
                subcategoriesIds: formData.subcategoriesIds,
                brandId: formData.brandId,
                imageCover: formData.imageCover,
                images: formData.images
                    ? formData.images.split(",").map((item) => item.trim()).filter(Boolean)
                    : [],
                colors: formData.colors
                    ? formData.colors.split(",").map((item) => item.trim()).filter(Boolean)
                    : []
            };

            await createProduct(payload);

            setSuccessMessage("PRODUCT CREATED SUCCESSFULLY!");
            setFormData(initialFormData);
        } catch (err) {
            setError(getErrorMessage(err, "Failed to create product."));
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        formData,
        categories,
        subCategories,
        brands,
        isLoadingRefs,
        isSubmitting,
        error,
        successMessage,
        handleChange,
        handleSubcategoriesChange,
        handleSubmit
    };
};