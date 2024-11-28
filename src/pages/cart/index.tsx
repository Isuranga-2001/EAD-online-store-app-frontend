import { CheckIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { useCart } from "@/contexts/cartContext";
import VisitorLayout from "@/components/VisitorLayout";
import Link from "next/link";

export default function Example() {
  const { cartItems, totalPrice, removeFromCart } = useCart();

  const handleCheckout = async () => {};

  return (
    <VisitorLayout>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:px-0">
          <h1 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Shopping Cart
          </h1>

          <form className="mt-12">
            <section aria-labelledby="cart-heading">
              <h2 id="cart-heading" className="sr-only">
                Items in your shopping cart
              </h2>

              {cartItems.length > 0 ? (
                <ul
                  role="list"
                  className="divide-y divide-gray-200 border-b border-t border-gray-200"
                >
                  {cartItems.map((cartItem) => (
                    <li key={cartItem.ID} className="flex py-6">
                      <div className="flex-shrink-0">
                        <img
                          src={cartItem.images[0].url}
                          alt={"productImage"}
                          className="h-24 w-24 rounded-md object-cover object-center sm:h-32 sm:w-32"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col sm:ml-6">
                        <div>
                          <div className="flex justify-between">
                            <h4 className="text-sm">
                              <p className="font-medium text-gray-700 hover:text-gray-800">
                                {cartItem.name}
                              </p>
                            </h4>
                            <p className="ml-4 text-sm font-medium text-gray-900">
                              ${cartItem.price * cartItem.qty}
                            </p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            {cartItem.qty}
                          </p>
                        </div>

                        <div className="mt-4 flex flex-1 items-end justify-between">
                          <p className="flex items-center space-x-2 text-sm text-gray-700">
                            {cartItem.stock > 0 ? (
                              <CheckIcon
                                className="h-5 w-5 flex-shrink-0 text-light-green"
                                aria-hidden="true"
                              />
                            ) : (
                              <XMarkIcon
                                className="h-5 w-5 flex-shrink-0 text-red"
                                aria-hidden="true"
                              />
                            )}

                            <span>
                              {cartItem.stock > 0 ? "In stock" : "Out Of Stock"}
                            </span>
                          </p>
                          <div className="ml-4">
                            <button
                              type="button"
                              className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                              onClick={() => removeFromCart(cartItem.ID)}
                            >
                              <span>Remove</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="w-full flex justify-center items-center text-green font-semibold text-sm">
                  No items added to the cart
                </div>
              )}
            </section>

            {/* Order summary */}
            <section aria-labelledby="summary-heading" className="mt-10">
              <h2 id="summary-heading" className="sr-only">
                Order summary
              </h2>

              <div>
                <dl className="space-y-4">
                  <div className="flex items-center justify-between">
                    <dt className="text-base font-medium text-gray-900">
                      Subtotal
                    </dt>
                    <dd className="ml-4 text-base font-medium text-gray-900">
                      ${totalPrice}
                    </dd>
                  </div>
                </dl>
                <p className="mt-1 text-sm text-gray-500">
                  Shipping and taxes will be calculated at checkout.
                </p>
              </div>

              <div className="mt-10">
                <button
                  type="button"
                  onClick={handleCheckout}
                  className="w-full rounded-md border border-transparent bg-green px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-light-green focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                >
                  Checkout
                </button>
              </div>

              <div className="mt-6 text-center text-sm">
                <p>
                  or &nbsp;
                  <Link
                    href="/products"
                    className="font-medium text-green hover:text-light-green"
                  >
                    Continue Shopping
                    <span aria-hidden="true"> &rarr;</span>
                  </Link>
                </p>
              </div>
            </section>
          </form>
        </div>
      </div>
    </VisitorLayout>
  );
}
