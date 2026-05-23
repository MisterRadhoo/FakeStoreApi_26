const fieldClass =
    "pixel-font border-4 border-black bg-[#efe6bf] px-4 py-3 text-xs text-black outline-none placeholder:text-gray-500";

const ProductMediaFields = ({ formData, handleChange }) => {
    return (
        <>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                    <label htmlFor="imageCover" className="pixel-font text-sm text-black">
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
                    <label htmlFor="images" className="pixel-font text-sm text-black">
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
                <label htmlFor="description" className="pixel-font text-sm text-black">
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

export default ProductMediaFields;