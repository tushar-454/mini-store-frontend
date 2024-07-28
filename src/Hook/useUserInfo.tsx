import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useAuth from './useAuth';

const useUserInfo = () => {
  const { user } = useAuth();
  const {
    data: userInfo,
    isLoading: isUserLoad,
    isError: isUserError,
  } = useQuery({
    queryKey: ['userInfo'],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_baseurl}/users/one/${user?.email || ''}`,
      );
      return res.data;
    },
  });
  return { userInfo, isUserLoad, isUserError };
};

export default useUserInfo;
