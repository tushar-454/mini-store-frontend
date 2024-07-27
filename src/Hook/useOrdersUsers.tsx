import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';
import useUserInfo from './useUserInfo';

const useOrdersUsers = () => {
  const { userInfo } = useUserInfo();
  const [userId, setUserId] = useState<string | null>(null);
  const {
    data: userOrders,
    isLoading: loadUserOrders,
    isError: errorUserOrders,
    refetch: refetchUserOrders,
  } = useQuery({
    queryKey: ['userOrders'],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_baseurl}/users/orders?userId=${userId}`,
      );
      return res.data;
    },
  });
  useEffect(() => {
    setUserId(userInfo?.data._id);
  }, [userInfo]);
  return {
    userOrders,
    loadUserOrders,
    errorUserOrders,
    refetchUserOrders,
  };
};

export default useOrdersUsers;
