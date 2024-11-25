import axios from "axios";
import { Cart } from "@/interfaces/cartInterface";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const checkout = async (cart: Cart): Promise<Cart> => {
  try{
    const { data } = await axios.post(`${BASE_URL}/order`, cart);
    return data;
  }
    catch (error) {
       console.error(error);
       throw error;
    }
};


