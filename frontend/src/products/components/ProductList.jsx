import ProductCard from "./ProductCard.jsx";


const ProductList = ({ products, loading }) => {
    if (loading) {
        return <p className="py-16 text-center text-sm">LOADING...</p>;
    }

    if (products.length === 0) {
        return <p className="py-16 text-center text-sm">NO PRODUCTS FOUND</p>;
    }

    return (
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
                <ProductCard key={product._id} product={product} />
            ))}
        </div>
    );
};

export default ProductList;