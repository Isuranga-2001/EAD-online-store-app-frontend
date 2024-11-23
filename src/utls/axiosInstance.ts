import axios from "axios";
import Router from "next/router";
import {
  BadRequestException,
  InternalServerException,
  UnexpectedException,
  NotFoundException,
} from "@/utils/exceptions";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("kiti-token");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401 || error.response.status === 403) {
        Router.push("/error-page");
      } else {
        switch (error.response.status) {
          case 400:
            throw new BadRequestException("Bad request");
          case 404:
            throw new NotFoundException("Resource not found");
          case 500:
            throw new InternalServerException("Internal server error");
          default:
            throw new UnexpectedException("An unexpected error occurred");
        }
      }
    } else {
      throw new UnexpectedException("No response from server");
    }
  }
);

export default axiosInstance;
