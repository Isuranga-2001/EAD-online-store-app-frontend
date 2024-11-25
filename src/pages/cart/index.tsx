import { CheckIcon, XMarkIcon} from '@heroicons/react/20/solid'
import {checkout} from '@/services/cartService'
import { Cart } from '@/interfaces/cartInterface'



const cart: Cart = {
  userId: 1,
  status: 'PENDING',
  items: [
    {
      productId: 1,
      quantity: 2,
      price: 1000,
      name:'product 1',
      imageSrc:'https://www.sbsmobile.com/ned/247224-thickbox_default/floxy-headphones.jpg',
      imageAlt:'headphones',
      instock:true

    },
    {
      productId: 2,
      quantity: 1,
      price: 90000,
      name:'product 2',
      imageSrc:'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RW1geGv?ver=e834&q=90&m=6&h=705&w=1253&b=%23FFFFFFFF&f=jpg&o=f&p=140&aim=true',
      imageAlt:'laptop',
      instock:false
    },
  ],
}



export default function Example() {

  const totalPrice = cart.items.reduce((total, cartItem) => total + cartItem.price * cartItem.quantity, 0);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:px-0">
        <h1 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Shopping Cart</h1>

        <form className="mt-12">
          <section aria-labelledby="cart-heading">
            <h2 id="cart-heading" className="sr-only">
              Items in your shopping cart
            </h2>

            <ul role="list" className="divide-y divide-gray-200 border-b border-t border-gray-200">
              {cart.items.map((cartItem) => (
                <li key={cartItem.productId} className="flex py-6">
                  <div className="flex-shrink-0">
                    <img
                      src={cartItem.imageSrc}
                      alt={cartItem.imageAlt}
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
                        <p className="ml-4 text-sm font-medium text-gray-900">Rs.{cartItem.price * cartItem.quantity}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">{cartItem.quantity}</p>
                      
                    </div>

                    <div className="mt-4 flex flex-1 items-end justify-between">
                      <p className="flex items-center space-x-2 text-sm text-gray-700">
                        {cartItem.instock? (
                          <CheckIcon className="h-5 w-5 flex-shrink-0 text-light-green" aria-hidden="true" />
                        ) : (
                          <XMarkIcon className="h-5 w-5 flex-shrink-0 text-red" aria-hidden="true" />
                        )}

                        <span>{cartItem.instock ? 'In stock' : 'Out Of Stock'}</span>
                      </p>
                      <div className="ml-4">
                        <button type="button" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Order summary */}
          <section aria-labelledby="summary-heading" className="mt-10">
            <h2 id="summary-heading" className="sr-only">
              Order summary
            </h2>

            <div>
              <dl className="space-y-4">
                <div className="flex items-center justify-between">
                  <dt className="text-base font-medium text-gray-900">Subtotal</dt>
                  <dd className="ml-4 text-base font-medium text-gray-900">Rs.{totalPrice}</dd>
                </div>
              </dl>
              <p className="mt-1 text-sm text-gray-500">Shipping and taxes will be calculated at checkout.</p>
            </div>

            <div className="mt-10">
              <button
                type="button"
                onClick={handleCheckout}
                className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
              >
                Checkout
              </button>
            </div>

            <div className="mt-6 text-center text-sm">
              <p>
                or
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </a>
              </p>
            </div>
          </section>
        </form>
      </div>
    </div>
  )
}

async function handleCheckout() {
  try {
    const response = await checkout(cart)
    console.log('order placed successfully',response)
  } catch (error) {
    console.error(error)
  }
}
