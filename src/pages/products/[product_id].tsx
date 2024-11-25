import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getProductById } from "@/services/productService";
import ProductDetails from "@/components/ProductDetails";
import { Product } from "@/interfaces/productInterface"; // Ensure the Product interface is correctly imported

const ProductPage = () => {
    const router = useRouter();
    const { product_id } = router.query;
    const [product, setProduct] = useState<Product | null>(null); // Explicitly define the type
    const [loading, setLoading] = useState<boolean>(true); // Define the type for loading

    useEffect(() => {
        if (product_id) {
            fetchProduct();
        }
    }, [product_id]);

    const fetchProduct = async () => {
        try {
            const data = await getProductById(Number(product_id)); // Ensure `product_id` is a number
            setProduct(data); // This now works since `product` can be `Product | null`
        } catch (error) {
            console.error("Failed to fetch product:", error);
        } finally {
            setLoading(false); // Always stop loading once the fetch is complete
        }
    };

    if (loading) return <p>Loading...</p>;
    if (!product) return <p>Product not found</p>;

    return <ProductDetails product={product} />;
};

export default ProductPage;
