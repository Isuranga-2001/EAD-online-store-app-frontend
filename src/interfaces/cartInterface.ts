interface CartItem {
    productId: number;
    quantity: number;
    price: number;
  }
  
interface Cart {
    userId: number;
    status: 'PAID' | 'PENDING' | 'CANCELLED'; // Assuming possible statuses
    items: CartItem[];
  }