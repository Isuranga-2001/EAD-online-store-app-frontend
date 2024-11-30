import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { CartItem } from "@/interfaces/cartInterface";

interface CartContextType {
  cartItems: CartItem[];
  setCartItems: (items: CartItem[]) => void;
  totalPrice: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void; // Add this line
}

export const CartContext = createContext<CartContextType>({
  cartItems: [],
  setCartItems: () => {},
  totalPrice: 0,
  addToCart: () => {},
  removeFromCart: () => {}, // Add this line
});

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    const newTotalPrice = cartItems.reduce((acc, item) => {
      return acc + item.price * item.qty;
    }, 0);
    setTotalPrice(newTotalPrice);
  }, [cartItems]);

  const addToCart = (item: CartItem) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (cartItem) => cartItem.ID === item.ID
      );
      if (existingItem) {
        return prevItems.map((cartItem) =>
          cartItem.ID === item.ID ? { ...cartItem, qty: item.qty } : cartItem
        );
      } else {
        return [...prevItems, item];
      }
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.ID !== id));
  };

  return (
    <CartContext.Provider
      value={{ cartItems, setCartItems, totalPrice, addToCart, removeFromCart }} // Add removeFromCart here
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
