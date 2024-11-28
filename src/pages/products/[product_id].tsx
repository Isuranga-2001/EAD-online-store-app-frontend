import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getProductById } from "@/services/productService";
import ProductDetails from "@/components/ProductDetails";
import Toast from "@/components/Toast";
import { Product } from "@/interfaces/productInterface";
import VisitorLayout from "@/components/VisitorLayout";
import { toast } from "react-toastify";

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
      toast.error("Error occured while loading product");
      router.push("/products");
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <VisitorLayout>
        <p className="text-center text-lg text-gray-600">Loading...</p>
      </VisitorLayout>
    );

  if (!product)
    return (
      <VisitorLayout>
        <p className="text-center text-lg text-red-500 font-bold">
          Product not found
        </p>
      </VisitorLayout>
    );

  return (
    <VisitorLayout>
      <ProductDetails product={product} />
      <Toast />
    </VisitorLayout>
  );
};

export default ProductPage;
