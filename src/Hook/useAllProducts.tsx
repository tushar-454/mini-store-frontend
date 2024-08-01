import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useAllProducts = (
  fields: string,
  category: string,
  minPrice: number,
  maxPrice: number,
) => {
  const {
    data: allProducts,
    isLoading: allProductsLoad,
    isError: allProductsError,
    refetch,
  } = useQuery({
    queryKey: ['all-products'],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_baseurl}/users/products/field${fields && `?key=${fields}`}${category && `&category=${category}`}${minPrice ? `&minPrice=${minPrice}` : `&minPrice=0`}${maxPrice && `&maxPrice=${maxPrice}`}`,
      );
      return res.data;
    },
  });
  return {
    allProducts,
    allProductsLoad,
    allProductsError,
    refetch,
  };
};

export default useAllProducts;
