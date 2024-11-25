import React from "react";

const ProductDetails = ({ product }: { product: any }) => {
    return (
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto">
            {/* Product Title */}
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

            {/* Product Description */}
            <p className="text-gray-700 mt-4">{product.description}</p>

            {/* Price and Stock */}
            <div className="mt-6">
                <p className="text-xl font-semibold text-green-700">
                    Price: ${product.price}
                </p>
                <p className="text-sm text-gray-500">Stock: {product.stock}</p>
            </div>

            {/* Images */}
            <div className="mt-8">
                <h3 className="text-xl font-bold mb-2">Images</h3>
                <div className="grid grid-cols-3 gap-4">
                    {product.images.map((image: any, index: number) => (
                        <img
                            key={index}
                            src={image.url}
                            alt={`Product image ${index}`}
                            className="w-full h-32 object-cover rounded-lg"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
