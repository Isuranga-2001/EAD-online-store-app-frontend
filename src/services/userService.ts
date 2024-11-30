import axiosInstance from "@/utils/axiosInstance";
import {
  CreateUser,
  User,
  UpdateUser,
  LoginInterface,
} from "@/interfaces/userInterface";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const deleteUserById = async (id: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/users/${id}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createUser = async (userData: CreateUser): Promise<User> => {
  try {
    const response = await axiosInstance.post(`/users/auth/register`, userData);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUserById = async (id: number): Promise<User> => {
  try {
    const response = await axiosInstance.get(`/users/${id}`);
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
    const response = await axiosInstance.put(`/users/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUserByEmail = async (email: string): Promise<User> => {
  try {
    const response = await axiosInstance.get(`/users/email`, {
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
): Promise<LoginInterface> => {
  try {
    const response = await axiosInstance.post(`/users/auth/login`, {
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
    await axiosInstance.post(`/users/auth/send-password-reset-email`, {
      email,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const verifyOTP = async (
  email: string,
  otp: string
): Promise<string> => {
  try {
    const response = await axiosInstance.post(`/users/auth/verify-otp`, {
      email,
      token: otp,
      type: "email",
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const resetPassword = async (
  token: string,
  password: string
): Promise<boolean> => {
  try {
    await axiosInstance.post(`/users/auth/reset-password`, {
      accessToken: token,
      newPassword: password,
    });

    return true;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAllUsers = async (
  page: number,
  size: number
): Promise<{ users: User[]; total: number }> => {
  try {
    const response = await axiosInstance.get(`/users`, {
      params: { page, size },
    });
    return {
      users: response.data.content,
      total: response.data.totalElements,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
