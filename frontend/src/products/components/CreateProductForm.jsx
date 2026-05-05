import { useCreateProductForm } from "../hooks/useCreateProductForm.js";
import ProductFormFields from "./ProductFormFields.jsx";

const CreateProductForm = () => {
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
                    <h1 className="pixel-font text-center text-3xl text-[#ff3040] drop-shadow-[4px_4px_0_#030712] dark:drop-shadow-[4px_4px_0_#ffffff]">
                        CREATE PRODUCT
                    </h1>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <input
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="TITLE"
                            className="pixel-font border-4 border-black bg-[#efe6bf] px-4 py-3 text-xs uppercase"
                        />

                        <input
                            name="imageCover"
                            value={formData.imageCover}
                            onChange={handleChange}
                            placeholder="IMAGE COVER URL"
                            className="pixel-font border-4 border-black bg-[#efe6bf] px-4 py-3 text-xs uppercase"
                        />

                        <input
                            name="price"
                            type="number"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="PRICE"
                            className="pixel-font border-4 border-black bg-[#efe6bf] px-4 py-3 text-xs uppercase"
                        />

                        <input
                            name="stock"
                            type="number"
                            value={formData.stock}
                            onChange={handleChange}
                            placeholder="STOCK"
                            className="pixel-font border-4 border-black bg-[#efe6bf] px-4 py-3 text-xs uppercase"
                        />

                        <select
                            name="categoryId"
                            value={formData.categoryId}
                            onChange={handleChange}
                            disabled={isLoadingRefs}
                            className="pixel-font border-4 border-black bg-[#efe6bf] px-4 py-3 text-xs uppercase"
                        >
                            <option value="">SELECT CATEGORY</option>
                            {categories.map((category) => (
                                <option key={category._id} value={category._id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>

                        <select
                            name="brandId"
                            value={formData.brandId}
                            onChange={handleChange}
                            disabled={isLoadingRefs}
                            className="pixel-font border-4 border-black bg-[#efe6bf] px-4 py-3 text-xs uppercase"
                        >
                            <option value="">SELECT BRAND</option>
                            {brands.map((brand) => (
                                <option key={brand._id} value={brand._id}>
                                    {brand.name}
                                </option>
                            ))}
                        </select>

                        <select
                            name="currency"
                            value={formData.currency}
                            onChange={handleChange}
                            className="pixel-font border-4 border-black bg-[#efe6bf] px-4 py-3 text-xs uppercase"
                        >
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                            <option value="RON">RON</option>
                        </select>

                        <input
                            name="colors"
                            value={formData.colors}
                            onChange={handleChange}
                            placeholder="COLORS"
                            className="pixel-font border-4 border-black bg-[#efe6bf] px-4 py-3 text-xs uppercase"
                        />
                    </div>

                    <select
                        multiple
                        value={formData.subcategoriesIds}
                        onChange={handleSubcategoriesChange}
                        disabled={isLoadingRefs}
                        className="pixel-font min-h-32 border-4 border-black bg-[#efe6bf] px-4 py-3 text-xs uppercase"
                    >
                        {subCategories.map((subCategory) => (
                            <option key={subCategory._id} value={subCategory._id}>
                                {subCategory.name}
                            </option>
                        ))}
                    </select>

                    <textarea
                        name="images"
                        value={formData.images}
                        onChange={handleChange}
                        placeholder="IMAGES URLS"
                        className="pixel-font min-h-32 border-4 border-black bg-[#efe6bf] px-4 py-3 text-xs uppercase"
                    />

                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="DESCRIPTION"
                        className="pixel-font min-h-40 border-4 border-black bg-[#efe6bf] px-4 py-3 text-xs uppercase"
                    />

                    {error ? (
                        <p className="pixel-font border-4 border-black bg-[#f4a39a] px-4 py-3 text-xs uppercase text-black shadow-[6px_6px_0_#000]">
                            {error}
                        </p>
                    ) : null}

                    {successMessage ? (
                        <p className="pixel-font border-4 border-black bg-[#7fcf7a] px-4 py-3 text-xs uppercase text-black shadow-[6px_6px_0_#000]">
                            {successMessage}
                        </p>
                    ) : null}

                    <button
                        type="submit"
                        disabled={isSubmitting || isLoadingRefs}
                        className="pixel-font border-4 border-black bg-sky-300 px-6 py-4 text-xs uppercase text-black shadow-[8px_8px_0_#000] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none disabled:opacity-60"
                    >
                        {isSubmitting ? "CREATING..." : "CREATE PRODUCT"}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default CreateProductForm;