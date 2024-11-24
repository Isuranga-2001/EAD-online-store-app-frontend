import { ProductType } from "./productTypeInterface";
import { ProductImage, CreateProductImage } from "./productImageInterface";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  productTypeId: number;
  productType: ProductType;
  images: ProductImage[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateProduct {
  name: string;
  description: string;
  price: number;
  stock: number;
  productTypeId: number;
  images: CreateProductImage[];
}

export interface UpdateProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  productTypeId: number;
  images: CreateProductImage[];
}
