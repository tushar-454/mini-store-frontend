export type OrderItemType = {
  name: string;
  quentity: number;
  size: string;
  color: string;
};

export type UserType = {
  name: string;
  phone: string;
  city: string;
  area: string;
  address: string;
};

export type OrderType = {
  _id: string;
  orderDate: string;
  userId: UserType;
  orderItem: OrderItemType[];
  price: number;
  status: string;
};

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useAdminAllOrders = () => {
  const { data, isError, isLoading, refetch } = useQuery({
    queryKey: ['adminAllOrders'],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_baseurl}/admin/orders`,
      );
      return res.data;
    },
  });
  return {
    adminAllOrders: data,
    adminAllOrdersLoad: isLoading,
    adminAllOrdersError: isError,
    refetch,
  };
};

export default useAdminAllOrders;
