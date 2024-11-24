export interface ProductImage {
  id: number;
  url: string;
  productId: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductImage {
  url: string;
}

export interface UpdateProductImage {
  id: number;
  url: string;
  productId: number;
}
