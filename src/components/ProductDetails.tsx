import React, { useState } from "react";
import { Tab } from "@headlessui/react";
import { Product } from "@/interfaces/productInterface";

const ProductDetails = ({ product }: { product: Product }) => {
    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (type: "increment" | "decrement") => {
        if (type === "increment" && quantity < product.stock) {
            setQuantity((prev) => prev + 1);
        }
        if (type === "decrement" && quantity > 1) {
            setQuantity((prev) => prev - 1);
        }
    };

    return (
        <div className="bg-gray-100 text-black min-h-screen font-sans">
            <div className="mx-auto max-w-5xl px-4 py-8">
                <div className="bg-white shadow-lg rounded-lg p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8">
                        {/* Image Gallery */}
                        <div>
                            <Tab.Group>
                                <Tab.Panels>
                                    {product.images.map((image, index) => (
                                        <Tab.Panel key={index} className="rounded-lg overflow-hidden">
                                            <img
                                                src={image.url}
                                                alt={`Image ${index}`}
                                                className="w-full h-auto object-cover"
                                            />
                                        </Tab.Panel>
                                    ))}
                                </Tab.Panels>
                                <Tab.List className="flex space-x-2 mt-4">
                                    {product.images.map((image, index) => (
                                        <Tab key={index} className="w-16 h-16 border rounded-lg">
                                            {({ selected }) => (
                                                <img
                                                    src={image.url}
                                                    alt={`Thumbnail ${index}`}
                                                    className={`object-cover w-full h-full ${
                                                        selected ? "ring-2 ring-black" : ""
                                                    }`}
                                                />
                                            )}
                                        </Tab>
                                    ))}
                                </Tab.List>
                            </Tab.Group>
                        </div>

                        {/* Product Info */}
                        <div className="px-4">
                            <h1 className="text-3xl font-bold">{product.name}</h1>
                            <p className="text-2xl mt-3">{`Price: $${product.price}`}</p>
                            <p className="text-gray-600 mt-2">{product.description}</p>

                            {/* Quantity Selector */}
                            <div className="mt-6">
                                <h3 className="text-sm font-bold">Quantity</h3>
                                <div className="flex items-center space-x-2 mt-2">
                                    <button
                                        onClick={() => handleQuantityChange("decrement")}
                                        disabled={quantity === 1}
                                        className="px-3 py-1 border border-gray-300 bg-white rounded text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                                    >
                                        -
                                    </button>
                                    <span className="px-4 py-1 border border-gray-300 bg-gray-100 rounded">
                                        {quantity}
                                    </span>
                                    <button
                                        onClick={() => handleQuantityChange("increment")}
                                        disabled={quantity === product.stock}
                                        className="px-3 py-1 border border-gray-300 bg-white rounded text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            {/* Add to Cart */}
                            <div className="mt-6 flex">
                                <button
                                    type="submit"
                                    className="flex max-w-xs flex-1 items-center justify-center rounded-md bg-black px-8 py-3 text-base font-medium text-white hover:bg-gray-700"
                                >
                                    Add to cart
                                </button>
                            </div>

                            {/* Product Type */}
                            <div className="mt-6">
                                <h3 className="text-sm font-bold">Product Type</h3>
                                <p className="mt-2">{product.product_type.name}</p>
                            </div>
                        </div>
                    </div>

                    {/* Detailed Description */}
                    <div className="mt-10">
                        <h3 className="text-xl font-bold">Product Description</h3>
                        <p className="mt-4 text-gray-700 text-base">
                            {product.description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
