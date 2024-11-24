import axiosInstance from "@/utils/axiosInstance";
import {
  CreateProductType,
  ProductType,
} from "@/interfaces/productTypeInterface";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const createProductType = async (
  productTypeData: CreateProductType
): Promise<ProductType> => {
  try {
    const response = await axiosInstance.post(
      `${BASE_URL}/products/types`,
      productTypeData
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAllProductTypes = async (): Promise<ProductType[]> => {
  try {
    const response = await axiosInstance.get(`${BASE_URL}/products/types`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteProductTypeById = async (id: number): Promise<void> => {
  try {
    await axiosInstance.delete(`${BASE_URL}/products/types/${id}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
