import { Product } from "./productInterface";
import { User } from "./userInterface";
import { Payment, PaymentType } from "./paymentInterface";

export interface OrderItem {
  productId: number;
  quantity: number;
  price: number;
}

export interface OrderItemWithProduct extends OrderItem {
  product: Product;
}

export interface Order {
  id: number;
  userId: number;
  status: string;
  items: OrderItem[];
}

export interface OrderWithDetails {
  id: number;
  userId: number;
  status: string;
  items: OrderItemWithProduct[];
  payment: Payment[];
}

export interface OrderWithDetailsAndUser extends OrderWithDetails {
  user: User;
}

export interface CreateOrder {
  userId: number;
  items: OrderItem[];
}

export interface CreateOrderWithPayment extends CreateOrder {
  paymentType: PaymentType;
}
