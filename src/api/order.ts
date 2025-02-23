import { BASE_URL } from '@/constant';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type LineItem = {
  name: string;
  image: string;
  price: number;
  quantity: number;
  variant: string;
  discount: number;
  _id: string;
};

export type OrderData = {
  _id: string;
  user: null | string;
  name: string;
  email: string;
  phone: string;
  photo: null | string;
  line_items: LineItem[];
  price: number;
  discount: number;
  shipping: number;
  status: string;
  is_deleted: boolean;
  division: string;
  district: string;
  sub_district: string;
  union: null | string;
  village: null | string;
  address: string;
  coupon_code: string;
  coupon_discount: number;
  tracking_id: number;
  instruction: null | string;
  transactionId: string;
  isReviewed: boolean;
  createdAt: string;
  updatedAt: string;
};

type OrderResponse = {
  success: boolean;
  data: OrderData;
};
type OrdersResponse = {
  success: boolean;
  data: OrderData[];
};

type CreateOrder = {
  name: string;
  email: string;
  phone: string;
  line_items: {
    product_id: string;
    name: string;
    image: string;
    variant: string;
    quantity: number;
  }[];
  division: string;
  district: string;
  sub_district: string;
  address: string;
  coupon_code: string;
  discount: number;
  type: string;
  instruction: string;
  transactionId: string;
};

const order = createApi({
  reducerPath: 'apiOrder',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL, credentials: 'include' }),
  endpoints: (builder) => ({
    orders: builder.query<OrdersResponse, void>({
      query: () => '/order',
    }),
    order: builder.query<OrderResponse, number>({
      query: (trackingId) => `/tracking/${trackingId}`,
    }),
    createOrder: builder.mutation<OrderResponse, Partial<CreateOrder>>({
      query: (order) => ({
        url: '/order',
        method: 'POST',
        body: order,
      }),
    }),
    updateOrder: builder.mutation<{ success: boolean; message: string }, Partial<OrderData>>({
      query: ({ _id, status, is_deleted }) => ({
        url: `/order/${_id}`,
        method: 'PUT',
        body: { status, is_deleted },
      }),
    }),
  }),
});

export const { useOrderQuery, useOrdersQuery, useCreateOrderMutation, useUpdateOrderMutation } =
  order;
export { order };
