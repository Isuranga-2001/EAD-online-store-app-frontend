export interface Payment{
  paymentId: number;
  paymentType: string;
  orderId: number;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentType{
  paymentType: string;
}