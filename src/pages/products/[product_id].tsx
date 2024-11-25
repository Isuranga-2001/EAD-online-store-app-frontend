import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getProductById } from "@/services/productService";
import ProductDetails from "@/components/ProductDetails";
import { Product } from "@/interfaces/productInterface";

const ProductPage = () => {
    const router = useRouter();
    const { product_id } = router.query;
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (product_id) {
            fetchProduct();
        }
    }, [product_id]);

    const fetchProduct = async () => {
        try {
            const data = await getProductById(Number(product_id));
            setProduct(data);
        } catch (error) {
            console.error("Failed to fetch product:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (!product) return <p>Product not found</p>;

    return <ProductDetails product={product} />;
};

export default ProductPage;
