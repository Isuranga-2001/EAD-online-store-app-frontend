import React from "react";

const ProductDetails = ({ product }: { product: any }) => {
    return (
        <div className="product-details">
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <p className="text-gray-700">{product.description}</p>
            <p className="text-lg font-semibold">Price: ${product.price}</p>
            <p className="text-sm text-gray-500">Stock: {product.stock}</p>
            <div>
                <h3 className="text-xl font-bold mt-4">Images</h3>
                <div className="grid grid-cols-3 gap-4">
                    {product.images.map((image: any, index: number) => (
                        <img
                            key={index}
                            src={image.url}
                            alt={`Image ${index}`}
                            className="w-full h-32 object-cover"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
