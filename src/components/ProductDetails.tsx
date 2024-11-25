import React from "react";

const ProductDetails = ({ product }: { product: any }) => {
    return (
        <div className="min-h-screen bg-light-green flex items-center justify-center p-4">
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl w-full">
                <h1 className="text-3xl font-bold text-green mb-4">{product.name}</h1>
                <p className="text-gray-700 mb-2">{product.description}</p>
                <p className="text-xl font-semibold text-red mb-2">
                    Price: <span className="text-green">${product.price}</span>
                </p>
                <p className="text-sm text-gray-500 mb-4">Stock: {product.stock}</p>
                <div>
                    <h3 className="text-2xl font-semibold mb-4">Images</h3>
                    <div className="grid grid-cols-3 gap-4">
                        {product.images.map((image: any, index: number) => (
                            <img
                                key={index}
                                src={image.url}
                                alt={`Product Image ${index}`}
                                className="w-full h-32 object-cover rounded-lg shadow-sm border border-gray-200"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
