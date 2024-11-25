import React, { useEffect, useState } from "react";
import { Dialog, Disclosure, Transition } from "@headlessui/react";
import { MinusIcon, PlusIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { FunnelIcon } from "@heroicons/react/24/outline";
import { getAllProducts, searchProducts } from "@/services/productService";
import { getAllProductTypes } from "@/services/productTypeService";
import { Product } from "@/interfaces/productInterface";
import { ProductType } from "@/interfaces/productTypeInterface";
import Pagination from "@/components/Pagination";
import VisitorLayout from "@/components/VisitorLayout";
import Spinner from "@/components/Spinner";
import Button from "@/components/Button";

const initialFilters = [
  {
    id: "price",
    name: "Price",
    options: [
      { value: "0-50", label: "Under $50", checked: false },
      { value: "50-100", label: "$50 to $100", checked: false },
      { value: "100-200", label: "$100 to $200", checked: false },
      { value: "200+", label: "Over $200", checked: false },
    ],
  },
  {
    id: "in_stock",
    name: "In Stock",
    options: [{ value: "true", label: "In Stock", checked: false }],
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [productTypes, setProductTypes] = useState<ProductType[]>([]);
  const [filters, setFilters] = useState(initialFilters);
  const [filtersState, setFiltersState] = useState({
    min_price: undefined as number | undefined,
    max_price: undefined as number | undefined,
    in_stock: undefined as boolean | undefined,
    product_type_id: undefined as number | undefined,
    page: 1,
    page_size: 12,
  });
  const [totalPages, setTotalPages] = useState<number>(1);
  const [jumpPage, setJumpPage] = useState<string>("1");
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>(
    {}
  );

  useEffect(() => {
    const fetchProductTypes = async () => {
      try {
        const types = await getAllProductTypes();
        setProductTypes(types);
        // Transform the response into the format required for the filters
        const productTypeOptions = types.map((type) => ({
          value: type.ID.toString(),
          label: type.name,
          checked: false,
        }));
        // Add the product type options to the filters array
        setFilters((prevFilters) => [
          ...prevFilters.filter((filter) => filter.id !== "product_type_id"),
          {
            id: "product_type_id",
            name: "Product Type",
            options: productTypeOptions,
          },
        ]);
      } catch (error) {
        console.error("Failed to fetch product types:", error);
      }
    };

    fetchProductTypes();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let response;
        if (
          filtersState.min_price === undefined &&
          filtersState.max_price === undefined &&
          filtersState.in_stock === undefined &&
          filtersState.product_type_id === undefined
        ) {
          response = await getAllProducts(
            filtersState.page,
            filtersState.page_size
          );
          console.log("response:", response);
        } else {
          response = await searchProducts(filtersState);
          console.log("search response:", response);
        }
        setProducts(response.products);
        setTotalPages(Math.ceil(response.total / filtersState.page_size));
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filtersState]);

  const handleFilterChange = (
    filterId: keyof typeof filtersState | "price",
    optionValue: any
  ) => {
    if (filterId === "price") {
      let min: number | undefined;
      let max: number | undefined;
      if (optionValue === "0-50") {
        min = 0;
        max = 50;
      } else if (optionValue === "50-100") {
        min = 50;
        max = 100;
      } else if (optionValue === "100-200") {
        min = 100;
        max = 200;
      } else if (optionValue === "200+") {
        min = 200;
        max = undefined;
      }
      setFiltersState((prevState) => ({
        ...prevState,
        min_price: min,
        max_price: max,
      }));
      setFilters((prevFilters) =>
        prevFilters.map((filter) =>
          filter.id === "price"
            ? {
                ...filter,
                options: filter.options.map((option) => ({
                  ...option,
                  checked: option.value === optionValue,
                })),
              }
            : filter
        )
      );
    } else {
      setFiltersState((prevState) => ({
        ...prevState,
        [filterId]: optionValue,
      }));
      setFilters((prevFilters) =>
        prevFilters.map((filter) =>
          filter.id === filterId
            ? {
                ...filter,
                options: filter.options.map((option) => ({
                  ...option,
                  checked: option.value === optionValue,
                })),
              }
            : filter
        )
      );
    }

    // Ensure the section remains open when an item is selected
    setOpenSections((prevState) => ({
      ...prevState,
      [filterId]: true,
    }));
  };

  const handlePageChange = (page: number) => {
    setFiltersState((prevState) => ({
      ...prevState,
      page,
    }));
  };

  const handleJumpPageChange = (page: string) => {
    setJumpPage(page);
  };

  const handleJumpToPage = () => {
    const pageNumber = parseInt(jumpPage, 10);
    if (!isNaN(pageNumber) && pageNumber > 0 && pageNumber <= totalPages) {
      handlePageChange(pageNumber);
    }
  };

  const toggleSection = (sectionId: string) => {
    setOpenSections((prevState) => ({
      ...prevState,
      [sectionId]: !prevState[sectionId],
    }));
  };

  const clearFilters = () => {
    //setFilters(initialFilters);
    setFiltersState({
      min_price: undefined,
      max_price: undefined,
      in_stock: undefined,
      product_type_id: undefined,
      page: 1,
      page_size: 12,
    });
    //setOpenSections({});
  };

  return (
    <VisitorLayout>
      <div className="bg-white">
        <div>
          <Transition.Root show={mobileFiltersOpen} as={React.Fragment}>
            <Dialog
              as="div"
              className="relative z-40 lg:hidden"
              onClose={setMobileFiltersOpen}
            >
              <Transition.Child
                as={React.Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>

              <div className="fixed inset-0 z-40 flex">
                <Transition.Child
                  as={React.Fragment}
                  enter="transition ease-in-out duration-300 transform"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transition ease-in-out duration-300 transform"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                    <div className="flex items-center justify-between px-4">
                      <h2 className="text-lg font-medium text-gray-900">
                        Filters
                      </h2>
                      <button
                        type="button"
                        className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                        onClick={() => setMobileFiltersOpen(false)}
                      >
                        <span className="sr-only">Close menu</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>

                    <form className="mt-4 border-t border-gray-200">
                      {filters.map((section) => (
                        <Disclosure
                          as="div"
                          key={section.id}
                          className="border-t border-gray-200 px-4 py-6"
                          defaultOpen={openSections[section.id]}
                        >
                          {({ open }) => (
                            <>
                              <h3 className="-mx-2 -my-3 flow-root">
                                <Disclosure.Button
                                  className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500"
                                  onClick={() => toggleSection(section.id)}
                                >
                                  <span className="font-medium text-gray-900">
                                    {section.name}
                                  </span>
                                  <span className="ml-6 flex items-center">
                                    {open ? (
                                      <MinusIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    ) : (
                                      <PlusIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    )}
                                  </span>
                                </Disclosure.Button>
                              </h3>
                              <Disclosure.Panel className="pt-6">
                                <div className="space-y-4">
                                  {section.options.map((option, optionIdx) => (
                                    <div
                                      key={option.value}
                                      className="flex items-center"
                                    >
                                      <input
                                        id={`filter-mobile-${section.id}-${optionIdx}`}
                                        name={`${section.id}[]`}
                                        defaultValue={option.value}
                                        type="checkbox"
                                        checked={
                                          String(
                                            filtersState[
                                              section.id as keyof typeof filtersState
                                            ]
                                          ) === option.value
                                        }
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                        onChange={() =>
                                          handleFilterChange(
                                            section.id as
                                              | keyof typeof filtersState
                                              | "price",
                                            option.value
                                          )
                                        }
                                      />
                                      <label
                                        htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                        className="ml-3 min-w-0 flex-1 text-gray-500"
                                      >
                                        {option.label}
                                      </label>
                                    </div>
                                  ))}
                                </div>
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                      ))}
                      <div className="w-full mt-4 px-4 flex justify-end">
                        <Button
                          caption="Clear Filters"
                          onClick={clearFilters}
                          width="w-full"
                        />
                      </div>
                    </form>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root>

          <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-12">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                ITW Digital Products
              </h1>

              <div className="flex items-center">
                <button
                  type="button"
                  className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
                  onClick={() => setMobileFiltersOpen(true)}
                >
                  <span className="sr-only">Filters</span>
                  <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>

            <section aria-labelledby="products-heading" className="pb-24 pt-6">
              <h2 id="products-heading" className="sr-only">
                Products
              </h2>

              <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                <form className="hidden lg:block">
                  {filters.map((section) => (
                    <Disclosure
                      as="div"
                      key={section.id}
                      className="border-b border-gray-200 py-6"
                      defaultOpen={openSections[section.id]}
                    >
                      {({ open }) => (
                        <>
                          <h3 className="-my-3 flow-root">
                            <Disclosure.Button
                              className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500"
                              onClick={() => toggleSection(section.id)}
                            >
                              <span className="font-medium text-gray-900">
                                {section.name}
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-4">
                              {section.options.map((option, optionIdx) => (
                                <div
                                  key={option.value}
                                  className="flex items-center"
                                >
                                  <input
                                    id={`filter-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    defaultValue={option.value}
                                    type="checkbox"
                                    checked={
                                      String(
                                        filtersState[
                                          section.id as keyof typeof filtersState
                                        ]
                                      ) === option.value
                                    }
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    onChange={() =>
                                      handleFilterChange(
                                        section.id as
                                          | keyof typeof filtersState
                                          | "price",
                                        option.value
                                      )
                                    }
                                  />
                                  <label
                                    htmlFor={`filter-${section.id}-${optionIdx}`}
                                    className="ml-3 text-sm text-gray-600"
                                  >
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                  <div className="w-full mt-4 flex justify-end">
                    <Button
                      caption="Clear Filters"
                      onClick={clearFilters}
                      width="w-full"
                    />
                  </div>
                </form>

                <div className="lg:col-span-3">
                  {products.length === 0 ? (
                    <div className="flex flex-col items-center justify-center">
                      <img
                        src="/img/no-product-found.png"
                        alt="No products found"
                        className="w-1/2 h-1/2 object-cover"
                      />
                      {/* <p className="mt-4 text-lg font-medium text-gray-900">No products were found.</p> */}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                      {products.map((product) => (
                        <a key={product.ID} href="#" className="group">
                          <img
                            alt={product.name}
                            src={
                              product.images && product.images.length > 0
                                ? product.images[0].url
                                : "/img/fallback-image.jpg"
                            }
                            className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-[7/8]"
                          />
                          <h3 className="mt-4 text-sm text-gray-700">
                            {product.name}
                          </h3>
                          <p className="mt-1 text-lg font-medium text-gray-900">
                            ${product.price}
                          </p>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </section>

            <Pagination
              currentPage={filtersState.page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              onJumpPageChange={handleJumpPageChange}
              jumpPage={jumpPage}
              handleJumpToPage={handleJumpToPage}
            />
          </main>
        </div>
      </div>
      <Spinner isVisible={loading} />
    </VisitorLayout>
  );
};

export default ProductsPage;
