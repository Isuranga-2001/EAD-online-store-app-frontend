import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import SidebarLayout from "@/components/SidebarLayout";
import { Table, TableColumn } from "@/components/Table";
import { getAllOrders } from "@/services/orderService";
import { Order } from "@/interfaces/orderInterface";
import Spinner from "@/components/Spinner";
import Toast from "@/components/Toast";
import { toast } from "react-toastify";

export interface OrderItemForTable {
  orderID: number;
  totalItems: number;
  totalCost: number;
}

export default function AdminOrdersPage() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const [orders, setOrders] = useState<OrderItemForTable[]>([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await getAllOrders();

      let ordersForTable: OrderItemForTable[] = [];
      for (let order of response) {
        const totalItems = order.items.reduce(
          (sum, item) => sum + item.quantity,
          0
        );
        const totalCost = order.items.reduce(
          (sum, item) => sum + item.quantity * item.price,
          0
        );

        ordersForTable.push({
          orderID: order.id,
          totalItems: totalItems,
          totalCost: totalCost,
        });
      }
      setOrders(ordersForTable);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  const handleViewEditClick = (orderId: number) => {
    router.push(`/admin/orders/${orderId}`);
  };

  const calculateTotalPrice = (items: Order["items"]) => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const columns: TableColumn<OrderItemForTable>[] = [
    { header: "Order ID", accessor: "orderID" },
    {
      header: "Total Products",
      accessor: "totalItems",
    },
    {
      header: "Total Price (USD)",
      accessor: "totalCost",
    },
    {
      header: "Actions",
      accessor: "orderID",
      isButton: true,
      buttonCaption: "View/Edit",
      onClick: (row: OrderItemForTable) => handleViewEditClick(row.orderID),
    },
  ];

  return (
    <SidebarLayout selectedSidebarItem={"viewOrders"}>
      <div className="p-4">
        <Table
          columns={columns}
          data={orders}
          currentPage={1}
          totalPages={1}
          onPageChange={() => {}}
        />
      </div>
      <Spinner isVisible={loading} />
      <Toast />
    </SidebarLayout>
  );
}
