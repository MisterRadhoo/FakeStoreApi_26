const CartEmpty = () => {
    return (
        <div className="border-4 border-black bg-white p-8 shadow-[10px_10px_0_#000] dark:border-white dark:bg-slate-900 dark:text-white dark:shadow-[10px_10px_0_#ffffff]">
            <h2 className="pixel-font text-lg">YOUR CART IS EMPTY</h2>
            <p className="pixel-font mt-6 text-xs uppercase leading-6 text-slate-700 dark:text-slate-300">
                Nothing here yet.
            </p>
        </div>
    );
};

export default CartEmpty;