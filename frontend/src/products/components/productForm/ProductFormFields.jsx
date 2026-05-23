import ProductBasicFields from "./ProductBasicFields.jsx";
import ProductRefsFields from "./ProductRefsFields.jsx";
import ProductMediaFields from "./ProductMediaFields.jsx";

const ProductFormFields = ({
    formData,
    categories,
    subCategories,
    brands,
    isLoadingRefs,
    handleChange,
    handleSubcategoriesChange
}) => {
    return (
        <>
            <ProductBasicFields
                formData={formData}
                handleChange={handleChange}
            />

            <ProductRefsFields
                formData={formData}
                categories={categories}
                subCategories={subCategories}
                brands={brands}
                isLoadingRefs={isLoadingRefs}
                handleChange={handleChange}
                handleSubcategoriesChange={handleSubcategoriesChange}
            />

            <ProductMediaFields
                formData={formData}
                handleChange={handleChange}
            />
        </>
    );
};

export default ProductFormFields;