export type Payment = {
  type: string;
  address?: any;
  creditCard?: any;
};

export type Delivery = {
  type: string;
  address: any;
};

export type Order = {
  id?: string;
  userId: string;
  cartId: string;
  payment: Payment;
  delivery: Delivery;
  comments: string;
  status: string;
  total: number;
};
