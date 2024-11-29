export interface OrderItem {
    productId: number;
    quantity: number;
    price: number;
  }
  
export  interface Order {
    id: number;
    userId: number;
    status: string;
    items: OrderItem[];
  }

export interface GetAllOrders{
    orders: Order[];
  }

export interface GetOrderById{ 
    order: Order;
  }

export interface GetOrderByUserId{
    orders: Order[];
  }


export interface CreateOrder {
    userId: number;
    items: OrderItem[];
  }

export interface CreateOrderWithPayment extends CreateOrder {
    paymentType: string;
}



