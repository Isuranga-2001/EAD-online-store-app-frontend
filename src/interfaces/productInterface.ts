export interface ProductType {
  id: number;
  name: string;
  products: Product[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductImage {
  id: number;
  url: string;
  productId: number;
  createdAt: string;
  updatedAt: string;
}

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
