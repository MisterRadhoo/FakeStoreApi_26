import ProductFormFields from "./ProductFormFields.jsx";

const ProductForm = ({
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
    handleSubmit,
    submitLabel,
    submittingLabel
}) => {
    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <ProductFormFields
                formData={formData}
                categories={categories}
                subCategories={subCategories}
                brands={brands}
                isLoadingRefs={isLoadingRefs}
                handleChange={handleChange}
                handleSubcategoriesChange={handleSubcategoriesChange}
            />

            {error ? (
                <p className="pixel-font border-4 border-black bg-[#f4a39a] px-4 py-3 text-xs text-black shadow-[6px_6px_0_#000]">
                    {error}
                </p>
            ) : null}

            {successMessage ? (
                <p className="pixel-font border-4 border-black bg-[#7fcf7a] px-4 py-3 text-xs text-black shadow-[6px_6px_0_#000]">
                    {successMessage}
                </p>
            ) : null}

            <button
                type="submit"
                disabled={isSubmitting || isLoadingRefs}
                className="pixel-font border-4 border-black bg-sky-300 px-6 py-4 text-xs text-black shadow-[8px_8px_0_#000] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none disabled:opacity-60"
            >
                {isSubmitting ? submittingLabel : submitLabel}
            </button>
        </form>
    );
};

export default ProductForm;