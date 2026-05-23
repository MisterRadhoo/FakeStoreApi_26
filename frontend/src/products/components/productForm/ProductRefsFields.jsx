const fieldClass =
    "pixel-font border-4 border-black bg-[#efe6bf] px-4 py-3 text-xs text-black outline-none placeholder:text-gray-500";

const ProductRefsFields = ({
    formData,
    categories,
    subCategories,
    brands,
    isLoadingRefs,
    handleChange,
    handleSubcategoriesChange
}) => {
    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="flex flex-col gap-2">
                <label htmlFor="categoryId" className="pixel-font text-sm text-black">
                    CATEGORY
                </label>
                <select
                    id="categoryId"
                    name="categoryId"
                    value={formData.categoryId}
                    onChange={handleChange}
                    disabled={isLoadingRefs}
                    className={fieldClass}
                >
                    <option value="">SELECT CATEGORY</option>
                    {categories.map((category) => (
                        <option key={category._id} value={category._id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="brandId" className="pixel-font text-sm text-black">
                    BRAND
                </label>
                <select
                    id="brandId"
                    name="brandId"
                    value={formData.brandId}
                    onChange={handleChange}
                    disabled={isLoadingRefs}
                    className={fieldClass}
                >
                    <option value="">SELECT BRAND</option>
                    {brands.map((brand) => (
                        <option key={brand._id} value={brand._id}>
                            {brand.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col gap-2 md:col-span-2">
                <label htmlFor="subcategoriesIds" className="pixel-font text-sm text-black">
                    SUBCATEGORIES
                </label>
                <select
                    id="subcategoriesIds"
                    name="subcategoriesIds"
                    multiple
                    value={formData.subcategoriesIds}
                    onChange={handleSubcategoriesChange}
                    disabled={isLoadingRefs}
                    className={`${fieldClass} min-h-40`}
                >
                    {subCategories.map((subCategory) => (
                        <option key={subCategory._id} value={subCategory._id}>
                            {subCategory.name}
                        </option>
                    ))}
                </select>

                <p className="pixel-font text-[10px] text-gray-600">
                    HOLD CTRL TO SELECT MULTIPLE
                </p>
            </div>
        </div>
    );
};

export default ProductRefsFields;