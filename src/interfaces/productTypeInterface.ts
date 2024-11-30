import { Product } from "./productInterface";

export interface ProductType {
  ID: number;
  name: string;
  products: Product[];
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
}

export interface CreateProductType {
  name: string;
}

export interface UpdateProductType {
  name: string;
}
