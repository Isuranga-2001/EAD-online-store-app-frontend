import React, { useEffect, useState } from "react";
import { getOrderByUserId } from "@/services/orderService";
import { OrderWithDetails } from "@/interfaces/orderInterface";
import Spinner from "@/components/Spinner";
import { CheckCircleIcon } from "@heroicons/react/20/solid";

interface OrderHistoryProps {
    userId: number;
}

const OrderHistory: React.FC<OrderHistoryProps> = ({ userId }) => {
    const [orders, setOrders] = useState<OrderWithDetails[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await getOrderByUserId(userId);
                setOrders(data);
            } catch (error) {
                console.error("Failed to fetch orders:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [userId]);

    if (loading) {
        return <Spinner isVisible={true} />;
    }

    if (orders.length === 0) {
        return <p className="text-gray-500">No orders found.</p>;
    }

    return (
        <div className="space-y-6">
            {orders.map((order) => (
                <div
                    key={order.id}
                    className="border border-gray-200 rounded-lg shadow-sm p-4"
                >
                    <h3 className="text-lg font-bold">Order #{order.id}</h3>
                    <p className="text-sm text-gray-600">Status: {order.status}</p>
                    <ul className="mt-4 space-y-4">
                        {order.items.map((item) => (
                            <li key={item.productId} className="flex items-center space-x-4">
                                <img
                                    src={item.product?.images?.[0]?.url || "/placeholder.png"} // Assuming the first image is displayed
                                    alt={item.product?.name || "Product"}
                                    className="w-16 h-16 rounded object-cover"
                                />
                                <div>
                                    <h4 className="text-sm font-bold">{item.product?.name}</h4>
                                    <p className="text-sm text-gray-600">
                                        ${item.price} x {item.quantity}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-4 flex items-center text-sm text-green-600">
                        <CheckCircleIcon className="h-5 w-5" />
                        <p className="ml-2">
                            {order.payment?.length > 0
                                ? "Payment completed"
                                : "Payment Pending"}
                        </p>

                    </div>
                </div>
            ))}
        </div>
    );
};

export default OrderHistory;
