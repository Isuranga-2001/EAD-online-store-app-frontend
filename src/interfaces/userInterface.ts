export interface CreateUser {
  type: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  postalCode?: number;
}

export interface User {
  id: number;
  type: string;
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
  type: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  postalCode: number;
}
