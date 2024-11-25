export interface CartItem {
    productId: number;
    quantity: number;
    price: number;
  }
  
export interface Cart {
    userId: number;
    status: 'PAID' | 'PENDING' | 'CANCELLED'; // Assuming possible statuses
    items: CartItem[];
  }