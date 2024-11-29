export enum UserType {
  USER = "USER",
  ADMIN = "ADMIN",
}

export interface CreateUser {
  type: UserType;
  name: string;
  email: string;
  phone: string;
  country: string;
  postalCode?: number;
  password: string;
}

export interface User {
  id: number;
  type: UserType;
  name: string;
  email: string;
  phone: string;
  country: string;
  postalCode: number;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateUser {
  id: number;
  type: UserType;
  name: string;
  email: string;
  phone: string;
  country: string;
  postalCode: number;
}

export interface LoginInterface {
  token: string;
  user: User;
}
