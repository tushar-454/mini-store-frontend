import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useUserInfo from './useUserInfo';

const useDashboardStatistics = () => {
  const { userInfo } = useUserInfo();
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['dashboardStatistics', userInfo?.id],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_baseurl}/admin/statistics`,
      );
      return res.data;
    },
  });
  return {
    dashboardStatistics: data,
    isDashboardStatisticsLoad: isLoading,
    isDashboardStatisticsError: isError,
    refetch,
  };
};

export default useDashboardStatistics;
