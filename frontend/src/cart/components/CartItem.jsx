const CartItem = ({ item, isMutating, updateItemQuantity, removeItem }) => {
    const lineTotal = Number(item.price || 0) * Number(item.quantity || 0);

    const handleIncrease = async () => {
        await updateItemQuantity({
            itemId: item._id,
            quantity: Number(item.quantity) + 1,
        });
    };

    const handleDecrease = async () => {
        const nextQuantity = Number(item.quantity) - 1;

        if (nextQuantity <= 0) {
            await removeItem(item._id);
            return;
        }

        await updateItemQuantity({
            itemId: item._id,
            quantity: nextQuantity,
        });
    };

    const handleRemove = async () => {
        await removeItem(item._id);
    };

    return (
        <article className="grid gap-5 border-4 border-black bg-[#0b1637] p-4 shadow-[8px_8px_0_#000] text-white md:grid-cols-[140px_1fr]">
            <div className="flex items-center justify-center border-4 border-black bg-[#020617] p-3">
                <img
                    src={item.imageCover || "/placeholder-product.png"}
                    alt={item.title || "Product"}
                    className="pixelated h-24 w-24 object-contain"
                />
            </div>

            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-3">
                    <h3 className="pixel-font text-sm leading-6">
                        {item.title || "UNTITLED PRODUCT"}
                    </h3>

                    <p className="pixel-font text-[10px] leading-6">
                        PRICE: ${Number(item.price || 0).toFixed(2)}
                    </p>

                    <p className="pixel-font text-[10px] leading-6">
                        QUANTITY: {item.quantity}
                    </p>

                    <p className="pixel-font text-[10px] leading-6">
                        LINE TOTAL: ${lineTotal.toFixed(2)}
                    </p>
                </div>

                <div className="flex flex-wrap gap-3">
                    <button
                        type="button"
                        onClick={handleDecrease}
                        disabled={isMutating}
                        className="pixel-font border-4 border-black bg-slate-500 px-4 py-2 text-xs shadow-[4px_4px_0_#000] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none disabled:opacity-60"
                    >
                        -
                    </button>

                    <button
                        type="button"
                        onClick={handleIncrease}
                        disabled={isMutating}
                        className="pixel-font border-4 border-black bg-sky-300 px-4 py-2 text-xs text-black shadow-[4px_4px_0_#000] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none disabled:opacity-60"
                    >
                        +
                    </button>

                    <button
                        type="button"
                        onClick={handleRemove}
                        disabled={isMutating}
                        className="pixel-font border-4 border-black bg-[#f88379] px-6 py-2 text-xs text-black shadow-[4px_4px_0_#000] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none disabled:opacity-60"
                    >
                        REMOVE
                    </button>
                </div>
            </div>
        </article>
    );
};

export default CartItem;