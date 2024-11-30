export interface ProductImage {
  ID: number;
  url: string;
  productId: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
}

export interface CreateProductImage {
  url: string;
}

export interface UpdateProductImage {
  url: string;
  productId: number;
}
