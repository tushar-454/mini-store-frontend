import { useQuery } from '@tanstack/react-query';
import axios from '../utils/axios';

const useAdminProduct = (id: string) => {
  const { data, isError, isLoading, refetch } = useQuery({
    queryKey: ['adminAllProducts'],
    queryFn: async () => {
      const res = await axios.get(`/admin/product/${id}`);
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
