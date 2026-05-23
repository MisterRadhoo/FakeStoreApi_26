const fieldClass =
    "pixel-font border-4 border-black bg-[#efe6bf] px-4 py-3 text-xs text-black outline-none placeholder:text-gray-500";

const ProductBasicFields = ({ formData, handleChange }) => {
    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="flex flex-col gap-2">
                <label htmlFor="title" className="pixel-font text-sm text-black">
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
                <label htmlFor="price" className="pixel-font text-sm text-black">
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
                <label htmlFor="stock" className="pixel-font text-sm text-black">
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
                <label htmlFor="currency" className="pixel-font text-sm text-black">
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

            <div className="flex flex-col gap-2 md:col-span-2">
                <label htmlFor="colors" className="pixel-font text-sm text-black">
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
    );
};

export default ProductBasicFields;