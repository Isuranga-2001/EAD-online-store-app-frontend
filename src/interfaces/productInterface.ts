import { ProductType } from "./productTypeInterface";
import { ProductImage, CreateProductImage } from "./productImageInterface";

export interface Product {
  ID: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  product_type_id: number;
  product_type: ProductType;
  images: ProductImage[];
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
}

export interface CreateProduct {
  name: string;
  description: string;
  price: number;
  stock: number;
  product_type_id: number;
  images: File[] | null;
}

export interface UpdateProduct {
  name: string;
  description: string;
  price: number;
  stock: number;
  product_type_id: number;
  images: File[] | null;
}
