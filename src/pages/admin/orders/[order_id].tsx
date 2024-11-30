import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SidebarLayout from "@/components/SidebarLayout";
import { getOrderById } from "@/services/orderService";
import { OrderWithDetailsAndUser } from "@/interfaces/orderInterface";
import Spinner from "@/components/Spinner";
import Toast from "@/components/Toast";
import { toast } from "react-toastify";

interface ProductsForTable {
  ID: number;
  name: string;
  price: number;
  productType: string;
  quantity: number;
  image: string;
  totalPrice: number;
}

export default function AdminViewSingleOrder() {
  const router = useRouter();
  const { order_id } = router.query;
  const [order, setOrder] = useState<OrderWithDetailsAndUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (order_id) {
      fetchOrderDetails(order_id as string);
    }
  }, [order_id]);

  const fetchOrderDetails = async (id: string) => {
    try {
      setLoading(true);
      const orderDetails = await getOrderById(Number(id));
      console.log(orderDetails);
      setOrder(orderDetails);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch order details");
      router.push("/admin/orders");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SidebarLayout selectedSidebarItem={"viewOrders"}>
      <div className="p-4">
        {order && (
          <>
            <h1 className="text-md text-black">
              Order ID:{" "}
              <span className="text-green font-bold">{order?.id}</span>
            </h1>
            <div className="px-4 py-4 mt-4 w-full rounded-lg border border-gray-200">
              <h2 className="text-md mb-2 text-black font-bold">
                User Details
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex justify-start items-center">
                  <span className="text-sm text-gray-500">Name :</span>
                  <span className="ms-4 text-black">{order.user.name}</span>
                </div>
                <div className="flex justify-start items-center">
                  <span className="text-sm text-gray-500">Email :</span>
                  <span className="ms-4 text-black">{order.user.email}</span>
                </div>
                <div className="flex justify-start items-center">
                  <span className="text-sm text-gray-500">Phone :</span>
                  <span className="ms-4 text-black">{order.user.phone}</span>
                </div>
                <div className="flex justify-start items-center">
                  <span className="text-sm text-gray-500">Postal Code :</span>
                  <span className="ms-4 text-black">
                    {order.user.postalCode}
                  </span>
                </div>
                <div className="flex justify-start items-center">
                  <span className="text-sm text-gray-500">
                    Payment Method :
                  </span>
                  <span className="ms-4 text-black">
                    {order.payment[0].paymentType}
                  </span>
                </div>
              </div>
            </div>
            {/* hr */}
            <div className="my-8 border border-gray-200"></div>
            <h2 className="text-md mb-2 text-black font-bold">
              Ordered Products
            </h2>
            <div className="flex flex-col justify-start items-start">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className={`w-full flex justify-between items-center rounded-lg border bg-gray-100 py-2 px-4 my-2`}
                >
                  <div className="flex justify-start items-center">
                    <img
                      src={item.product.images[0].url}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div className="flex flex-col ms-3 justify-between items-start">
                      <div>
                        <h5 className="text-green text-sm font-bold">
                          {item.product.name}
                        </h5>
                        <h5 className="text-black text-xs">
                          {item.product.product_type.name}
                        </h5>
                      </div>
                      <div>
                        <h5 className="text-green text-xs">
                          Price: ${item.price}
                        </h5>
                        <h5 className="text-black text-xs">
                          Qty: {item.quantity}
                        </h5>
                      </div>
                    </div>
                  </div>
                  <div className="h-full flex justify-end items-end text-green font-black text-sm">
                    ${item.price * item.quantity}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <Toast />
      <Spinner isVisible={loading} />
    </SidebarLayout>
  );
}
