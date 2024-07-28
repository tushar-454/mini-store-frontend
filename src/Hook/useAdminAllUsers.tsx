import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useAdminAllUsers = () => {
  const { data, isError, isLoading, refetch } = useQuery({
    queryKey: ['adminAllUsers'],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_baseurl}/admin/users`,
      );
      return res.data;
    },
  });
  return {
    adminAllUsers: data,
    adminAllUsersLoad: isLoading,
    adminAllUsersError: isError,
    refetch,
  };
};

export default useAdminAllUsers;
