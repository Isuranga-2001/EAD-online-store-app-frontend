import axiosInstance from "@/utils/axiosInstance";
import { CreateUser, User, UpdateUser } from "@/interfaces/userInterface";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const deleteUserById = async (id: number): Promise<void> => {
  try {
    await axiosInstance.delete(`${BASE_URL}/users/${id}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createUser = async (userData: CreateUser): Promise<User> => {
  try {
    const response = await axiosInstance.post(`${BASE_URL}/users`, userData);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUserById = async (id: number): Promise<User> => {
  try {
    const response = await axiosInstance.get(`${BASE_URL}/users/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateUser = async (
  id: number,
  userData: UpdateUser
): Promise<User> => {
  try {
    const response = await axiosInstance.put(
      `${BASE_URL}/users/${id}`,
      userData
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUserByEmail = async (email: string): Promise<User> => {
  try {
    const response = await axiosInstance.get(`${BASE_URL}/users/email`, {
      params: { email },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const loginUser = async (
  email: string,
  password: string
): Promise<User> => {
  try {
    const response = await axiosInstance.post(`${BASE_URL}/users/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const forgotPassword = async (email: string): Promise<void> => {
  try {
    await axiosInstance.post(`${BASE_URL}/users/forgot-password`, null, {
      params: { email },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};