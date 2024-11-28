export interface OrderItem {
    productId: number;
    quantity: number;
    price: number;
  }
  
export  interface Order {
    orderId: number;
    userId: number;
    status: string;
    items: OrderItem[];
  }

export interface CreateOrder {
    userId: number;
    items: OrderItem[];
  }

export interface CreateOrderWithPayment extends CreateOrder {
    paymentType: string;
}



