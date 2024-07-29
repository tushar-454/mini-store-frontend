export type ProductItemType = {
  _id: string;
  name: string;
  category: string;
  isStock: boolean;
  price: number;
  discount: number;
  description: string;
  image: string[]; // Ensure this matches the type in productInit
  type: string[]; // Ensure this matches the type in productInit
  productDetails: {
    productName: string;
    color: string[];
    size: string[];
    brand: string;
  };
};

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useAdminAllProducts = () => {
  const { data, isError, isLoading, refetch } = useQuery({
    queryKey: ['adminAllProducts'],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_baseurl}/admin/products`,
      );
      return res.data;
    },
  });
  return {
    adminAllProducts: data,
    adminAllProductsLoad: isLoading,
    adminAllProductsError: isError,
    refetch,
  };
};

export default useAdminAllProducts;
