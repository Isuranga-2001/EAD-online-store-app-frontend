import { Product } from "./productInterface";

export interface CartItem extends Product {
  qty: number;
}
