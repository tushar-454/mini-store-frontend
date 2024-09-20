import { useQuery } from '@tanstack/react-query';
import axios from '../utils/axios';

const useRelatedProduct = (id: string | undefined) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['relatedProduct'],
    queryFn: async () => {
      const res = await axios.get(`/users/product/related/${id}`);
      return res.data.data;
    },
  });
  return {
    relatedProducts: data,
    relatedProductLoad: isLoading,
    relatedProductError: isError,
  };
};

export default useRelatedProduct;
