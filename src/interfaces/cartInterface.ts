export interface CartItem {
    productId: number;
    quantity: number;
    price: number;
    name: string;
    imageSrc: string;
    imageAlt: string;
    instock: boolean;
  }
  
export interface Cart {
    userId: number;
    status: 'PAID' | 'PENDING' | 'CANCELLED'; // Assuming possible statuses
    items: CartItem[];
  }