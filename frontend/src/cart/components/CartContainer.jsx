import CartEmpty from "./CartEmpty.jsx";
import CartList from "./CartList.jsx";
import CartSummary from "./CartSummary.jsx";

const CartContainer = ({
    cart,
    cartItems,
    isMutating,
    updateItemQuantity,
    removeItem,
    applyCoupon,
    removeCoupon,
    clearUserCart,
}) => {
    if (!cartItems.length) {
        return <CartEmpty />;
    }

    return (
        <div className="grid gap-8 lg:grid-cols-[1.5fr_420px]">
            <CartList
                cartItems={cartItems}
                isMutating={isMutating}
                updateItemQuantity={updateItemQuantity}
                removeItem={removeItem}
            />

            <CartSummary
                cart={cart}
                isMutating={isMutating}
                applyCoupon={applyCoupon}
                removeCoupon={removeCoupon}
                clearUserCart={clearUserCart}
            />
        </div>
    );
};

export default CartContainer;