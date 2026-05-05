const fieldClass =
    "pixel-font border-4 border-black bg-[#efe6bf] px-4 py-3 text-xs uppercase text-black outline-none placeholder:text-gray-500";

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
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="title"
                        className="pixel-font text-sm uppercase text-black"
                    >
                        TITLE
                    </label>
                    <input
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="ENTER PRODUCT TITLE"
                        className={fieldClass}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="imageCover"
                        className="pixel-font text-sm uppercase text-black"
                    >
                        IMAGE COVER
                    </label>
                    <input
                        id="imageCover"
                        name="imageCover"
                        value={formData.imageCover}
                        onChange={handleChange}
                        placeholder="ENTER IMAGE COVER URL"
                        className={fieldClass}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="price"
                        className="pixel-font text-sm uppercase text-black"
                    >
                        PRICE
                    </label>
                    <input
                        id="price"
                        name="price"
                        type="number"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="ENTER PRICE"
                        className={fieldClass}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="stock"
                        className="pixel-font text-sm uppercase text-black"
                    >
                        STOCK
                    </label>
                    <input
                        id="stock"
                        name="stock"
                        type="number"
                        value={formData.stock}
                        onChange={handleChange}
                        placeholder="ENTER STOCK"
                        className={fieldClass}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="categoryId"
                        className="pixel-font text-sm uppercase text-black"
                    >
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
                    <label
                        htmlFor="brandId"
                        className="pixel-font text-sm uppercase text-black"
                    >
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

                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="currency"
                        className="pixel-font text-sm uppercase text-black"
                    >
                        CURRENCY
                    </label>
                    <select
                        id="currency"
                        name="currency"
                        value={formData.currency}
                        onChange={handleChange}
                        className={fieldClass}
                    >
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="RON">RON</option>
                    </select>
                </div>

                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="colors"
                        className="pixel-font text-sm uppercase text-black"
                    >
                        COLORS
                    </label>
                    <input
                        id="colors"
                        name="colors"
                        value={formData.colors}
                        onChange={handleChange}
                        placeholder="BLACK, WHITE, RED"
                        className={fieldClass}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="subcategoriesIds"
                        className="pixel-font text-sm uppercase text-black"
                    >
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

                    <p className="pixel-font text-[10px] uppercase text-gray-600">
                        HOLD CTRL TO SELECT MULTIPLE
                    </p>
                </div>

                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="images"
                        className="pixel-font text-sm uppercase text-black"
                    >
                        IMAGES
                    </label>
                    <textarea
                        id="images"
                        name="images"
                        value={formData.images}
                        onChange={handleChange}
                        placeholder="URL1, URL2, URL3"
                        className={`${fieldClass} min-h-40`}
                    />
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <label
                    htmlFor="description"
                    className="pixel-font text-sm uppercase text-black"
                >
                    DESCRIPTION
                </label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="ENTER PRODUCT DESCRIPTION"
                    className={`${fieldClass} min-h-40`}
                />
            </div>
        </>
    );
};

export default ProductFormFields;