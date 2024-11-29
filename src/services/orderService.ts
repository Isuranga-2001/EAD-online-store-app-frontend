import axios from "axios";
import {Order, OrderItem, GetAllOrders, GetOrderById, CreateOrder, CreateOrderWithPayment} from "../interfaces/orderInterface";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getAllOrders = async (): Promise<GetAllOrders> => {
  try {
    const response = await axiosInstance.get(`${BASE_URL}/orders`);
    return {
      orders: response.data,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getOrderById = async (id: number): Promise<GetOrderById> => {
  try {
    const response = await axiosInstance.get(`${BASE_URL}/orders/${id}`);
    return {
      order: response.data,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createOrder = async (order: CreateOrder): Promise<Order> => {
  try {
    const response = await axiosInstance.post(`${BASE_URL}/orders`, order);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createOrderWithPayment = async (order: CreateOrderWithPayment): Promise<Order> => {
  try {
    const response = await axiosInstance.post(`${BASE_URL}/orders/with-payment`, order);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
