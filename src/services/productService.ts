import axiosInstance from "@/utils/axiosInstance";
import {
  CreateProduct,
  Product,
  UpdateProduct,
} from "@/interfaces/productInterface";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface ProductsResponse {
  total: number;
  products: Product[];
}

export const getAllProducts = async (
    page: number,
    pageSize: number
): Promise<ProductsResponse> => {
  try {
    const response = await axiosInstance.get(`${BASE_URL}/products`, {
      params: { page, page_size: pageSize },
    });
    return {
      total: response.data.total,
      products: response.data.data,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createProduct = async (
    productData: CreateProduct
): Promise<Product> => {
  try {
    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("description", productData.description);
    formData.append("price", productData.price.toString());
    formData.append("stock", productData.stock.toString());
    formData.append("product_type_id", productData.product_type_id.toString());

    // Append images if they exist
    // if (productData.images && productData.images.length > 0) {
    //   productData.images.forEach((image, index) => {
    //     formData.append(`images[${index}]`, image);
    //   });
    // }
    if (productData.images && productData.images.length > 0) {
      Array.from(productData.images).forEach((file) => {
        formData.append("images", file);
      });
    }

    const response = await axiosInstance.post(
      `${BASE_URL}/products/`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getProductById = async (id: number): Promise<Product> => {
  try {
    const response = await axiosInstance.get(`${BASE_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateProduct = async (
    id: number,
    productData: UpdateProduct
): Promise<Product> => {
  try {
    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("description", productData.description);
    formData.append("price", productData.price.toString());
    formData.append("stock", productData.stock.toString());
    formData.append("product_type_id", productData.product_type_id.toString());

    // Append images if they exist
    if (productData.images && productData.images.length > 0) {
      Array.from(productData.images).forEach((file) => {
        formData.append("images", file);
      });
    }

    const response = await axiosInstance.put(
      `${BASE_URL}/products/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteProductById = async (id: number): Promise<void> => {
  try {
    await axiosInstance.delete(`${BASE_URL}/products/${id}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateProductStock = async (
    id: number,
    stock: number
): Promise<void> => {
  try {
    await axiosInstance.patch(`${BASE_URL}/products/${id}/stock`, { stock });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

interface SearchParams {
  name?: string;
  min_price?: number;
  max_price?: number;
  in_stock?: boolean;
  product_type_id?: number;
  page?: number;
  page_size?: number;
}

export const searchProducts = async (
    params: SearchParams
): Promise<ProductsResponse> => {
  try {
    const response = await axiosInstance.get(`${BASE_URL}/products/search/`, {
      params,
    });
    return {
      total: response.data.total,
      products: response.data.data,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
