import axios from "axios";
import { Cart, CartItem } from "@/interfaces/cartInterface";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const checkout = async (cart: Cart): Promise<Cart> => {
//create a new object with only the properties we need to send to the server
const checkoutCart = {
    ...cart,
    items: cart.items.map(({productId, quantity, price}: CartItem) => ({
        productId,
        quantity,
        price,
    })),
}
  try{
    const { data } = await axios.post(`${BASE_URL}/order`, checkoutCart);
    return data;
  }
    catch (error) {
       console.error(error);
       throw error;
    }
};


