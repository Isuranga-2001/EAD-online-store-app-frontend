import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getProductById } from "@/services/productService";
import ProductDetails from "@/components/ProductDetails";
import { Product } from "@/interfaces/productInterface";
import VisitorLayout from "@/components/VisitorLayout";

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
            <div className="bg-gray-100 min-h-screen font-sans flex flex-col items-center pt-10">
                <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-4xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8">
                        {/* Image Gallery */}
                        {product?.images?.length > 0 ? (
                            <div>
                                <h2 className="text-xl font-bold mb-4">Images</h2>
                                {product.images.map((image: any, index: number) => (
                                    <div
                                        key={index}
                                        className="rounded-lg overflow-hidden mb-4 border border-gray-300"
                                    >
                                        <img
                                            src={image.url}
                                            alt={image.alt || `Image ${index}`}
                                            className="w-full h-auto object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500">No images available</p>
                        )}

                        {/* Product Info */}
                        <div className="px-4 lg:px-0">
                            <h1 className="text-3xl font-bold tracking-tight text-black">
                                {product.name}
                            </h1>
                            <p className="text-2xl mt-3 text-black">{`Price: $${product.price}`}</p>
                            <p className="text-gray-600 mt-2">{product.description}</p>
                            <p className="text-gray-800 mt-2">{`Stock: ${product.stock}`}</p>

                            {/* Add to Cart */}
                            <div className="mt-6 flex">
                                <button
                                    type="button"
                                    className="flex items-center justify-center w-full rounded-md bg-black px-6 py-3 text-white hover:bg-gray-800"
                                >
                                    Add to cart
                                </button>
                                <button
                                    type="button"
                                    className="ml-4 flex items-center justify-center rounded-md px-3 py-3 text-gray-400 hover:bg-light-green"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-6 h-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M16.5 3.75a6.375 6.375 0 00-9 9L12 18l4.5-5.25a6.375 6.375 0 000-9z"
                                        />
                                    </svg>
                                    <span className="sr-only">Add to favorites</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </VisitorLayout>
    );
};

export default ProductPage;
