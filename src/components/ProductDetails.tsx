import React, { useState } from "react";
import { Disclosure, RadioGroup, Tab } from "@headlessui/react";
import { StarIcon } from "@heroicons/react/20/solid";
import { HeartIcon, MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Product } from "@/interfaces/productInterface";

const ProductDetails = ({ product }: { product: Product }) => {
    const [selectedColor, setSelectedColor] = useState<string | null>(
        product.images.length > 0 ? product.images[0].url : null
    );

    function classNames(...classes: string[]) {
        return classes.filter(Boolean).join(" ");
    }

    return (
        <div className="bg-light-green text-black min-h-screen font-sans">
            <div className="mx-auto max-w-4xl px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8">
                    {/* Image Gallery */}
                    <Tab.Group>
                        <Tab.Panels>
                            {product.images.map((image) => (
                                <Tab.Panel key={image.ID} className="rounded-lg overflow-hidden">
                                    <img
                                        src={image.url}
                                        alt={`Image for product ${product.name}`}
                                        className="w-full h-auto object-cover border border-black"
                                    />


                                </Tab.Panel>
                            ))}
                        </Tab.Panels>
                    </Tab.Group>

                    {/* Product Info */}
                    <div className="mt-10 px-4 lg:mt-0">
                        <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>
                        <div className="mt-3">
                            <p className="text-3xl tracking-tight">{`Price: $${product.price}`}</p>
                        </div>

                        <div className="mt-6">
                            <h3 className="text-sm">Description</h3>
                            <p className="mt-2 text-base">{product.description}</p>
                        </div>

                        <div className="mt-6">
                            <h3 className="text-sm">Stock</h3>
                            <p className="mt-2 text-base">{product.stock}</p>
                        </div>

                        {/* Add to Cart */}
                        <div className="mt-6 flex">
                            <button
                                type="submit"
                                className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-black px-8 py-3 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                            >
                                Add to cart
                            </button>
                            <button
                                type="button"
                                className="ml-4 flex items-center justify-center rounded-md px-3 py-3 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                            >
                                <HeartIcon className="h-6 w-6 flex-shrink-0" aria-hidden="true" />
                                <span className="sr-only">Add to favorites</span>
                            </button>
                        </div>

                        {/* Product Type */}
                        <div className="mt-6">
                            <h3 className="text-sm">Product Type</h3>
                            <p className="mt-2 text-base">{product.product_type.name}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
