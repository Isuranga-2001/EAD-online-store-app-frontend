import { Product } from "./productInterface";

export interface ProductType {
  id: number;
  name: string;
  products: Product[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductType {
  name: string;
}

export interface UpdateProductType {
  id: number;
  name: string;
}
