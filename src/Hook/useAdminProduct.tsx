import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useAdminProduct = (id: string) => {
  const { data, isError, isLoading, refetch } = useQuery({
    queryKey: ['adminAllProducts'],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_baseurl}/admin/product/${id}`,
      );
      return res.data;
    },
  });
  return {
    adminProduct: data,
    adminProductLoad: isLoading,
    adminProductError: isError,
    refetch,
  };
};

export default useAdminProduct;
