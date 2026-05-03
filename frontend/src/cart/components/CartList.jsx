import CartItem from "./CartItem.jsx";

const CartList = ({ cartItems, isMutating, updateItemQuantity, removeItem }) => {
    return (
        <div className="flex flex-col gap-6">
            {cartItems.map((item) => (
                <CartItem
                    key={item._id}
                    item={item}
                    isMutating={isMutating}
                    updateItemQuantity={updateItemQuantity}
                    removeItem={removeItem}
                />
            ))}
        </div>
    );
};

export default CartList;