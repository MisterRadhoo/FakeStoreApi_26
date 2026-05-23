import { useCreateProductForm } from "../hooks/useCreateProductForm.js";
import ProductForm from "../components/productForm/ProductForm.jsx";

const CreateProductPage = () => {
    const {
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
    } = useCreateProductForm();

    return (
        <section className="px-4 py-10">
            <div className="mx-auto max-w-4xl border-4 border-black bg-[#e7e7e7] p-6 shadow-[12px_12px_0_#000]">
                <div className="mb-10 pt-6 text-center">
                    <h1 className="pixel-font text-center text-3xl text-[#ff3040] [text-shadow:4px_4px_0_#000]">
                        CREATE PRODUCT
                    </h1>
                </div>

                <ProductForm
                    formData={formData}
                    categories={categories}
                    subCategories={subCategories}
                    brands={brands}
                    isLoadingRefs={isLoadingRefs}
                    isSubmitting={isSubmitting}
                    error={error}
                    successMessage={successMessage}
                    handleChange={handleChange}
                    handleSubcategoriesChange={handleSubcategoriesChange}
                    handleSubmit={handleSubmit}
                    submitLabel="CREATE PRODUCT"
                    submittingLabel="CREATING..."
                />
            </div>
        </section>
    );
};

export default CreateProductPage;