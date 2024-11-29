import axiosInstance from "../utils/axiosInstance";
import {
  Order,
  CreateOrder,
  CreateOrderWithPayment,
  OrderWithDetails,
} from "../interfaces/orderInterface";

export const getAllOrders = async (): Promise<Order[]> => {
  try {
    const response = await axiosInstance.get("/orders");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getOrderById = async (
  orderId: number
): Promise<OrderWithDetails> => {
  try {
    const response = await axiosInstance.get(`/orders/${orderId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getOrderByUserId = async (
  userId: number
): Promise<OrderWithDetails[]> => {
  try {
    const response = await axiosInstance.get(`/orders/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createOrder = async (order: CreateOrder): Promise<Order> => {
  try {
    const response = await axiosInstance.post("/orders", order);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createOrderWithPayment = async (
  order: CreateOrderWithPayment
): Promise<Order> => {
  try {
    const response = await axiosInstance.post("/orders/with-payment", order);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteOrderById = async (orderId: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/orders/${orderId}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updatePaymentStatus = async (
  orderId: number,
  status: string
): Promise<Order> => {
  try {
    const response = await axiosInstance.patch(
      `/orders/${orderId}/payment-status`,
      { status }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
