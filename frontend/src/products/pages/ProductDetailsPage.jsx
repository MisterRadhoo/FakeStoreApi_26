import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../productsApi.js";
import ProductDetailsCard from "../components/ProductDetailsCard.jsx";
import ReviewSection from "../../review/components/ReviewSection.jsx";
import AllReviewsModal from "../../review/components/AllReviewsModal.jsx";

const ProductDetailsPage = () => {
    const { productId } = useParams();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAllReviewsOpen, setIsAllReviewsOpen] = useState(false);

    const loadProduct = async (showPageLoader = false) => {
        if (!productId) {
            setProduct(null);
            setLoading(false);
            return;
        }

        if (showPageLoader) {
            setLoading(true);
        }

        try {
            const response = await getProductById(productId);
            setProduct(response.data || null);
        } catch {
            setProduct(null);
        } finally {
            if (showPageLoader) {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        loadProduct(true);
    }, [productId]);

    if (loading) {
        return (
            <main className="pixel-font min-h-screen bg-[#fff1b8] px-6 py-16 text-[#030712] dark:bg-[#111827] dark:text-white">
                <section className="mx-auto max-w-5xl border-4 border-[#030712] bg-white p-8 text-center shadow-[12px_12px_0_#030712] dark:border-white dark:bg-[#1f2937] dark:shadow-[12px_12px_0_#ffffff]">
                    LOADING...
                </section>
            </main>
        );
    }

    if (!product) {
        return (
            <main className="pixel-font min-h-screen bg-[#fff1b8] px-6 py-16 text-[#030712] dark:bg-[#111827] dark:text-white">
                <section className="mx-auto max-w-5xl border-4 border-[#030712] bg-white p-8 text-center shadow-[12px_12px_0_#030712] dark:border-white dark:bg-[#1f2937] dark:shadow-[12px_12px_0_#ffffff]">
                    PRODUCT NOT FOUND
                </section>
            </main>
        );
    }

    return (
        <main className="pixel-font min-h-screen bg-[#fff1b8] px-6 py-16 text-[#030712] dark:bg-[#111827] dark:text-white">
            <ProductDetailsCard
                product={product}
                onOpenAllReviews={() => setIsAllReviewsOpen(true)}
            />

            <section className="mx-auto mt-10 max-w-5xl">
                <ReviewSection
                    productId={productId}
                    productTitle={product.title}
                    reviews={product.reviews || []}
                    reloadProduct={loadProduct}
                />
            </section>

            {isAllReviewsOpen ? (
                <AllReviewsModal
                    productId={productId}
                    productTitle={product.title}
                    onClose={() => setIsAllReviewsOpen(false)}
                    reloadProduct={loadProduct}
                />
            ) : null}
        </main>
    );
};

export default ProductDetailsPage;


