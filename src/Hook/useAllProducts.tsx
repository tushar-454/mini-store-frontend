import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useAllProducts = (fields: string) => {
  const {
    data: allProducts,
    isLoading: allProductsLoad,
    isError: allProductsError,
  } = useQuery({
    queryKey: ['all-products'],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_baseurl}/users/products/field${fields && `?key=${fields}`}`,
      );
      return res.data;
    },
  });
  return {
    allProducts,
    allProductsLoad,
    allProductsError,
  };
};

export default useAllProducts;
