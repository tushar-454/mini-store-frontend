import { useQuery } from '@tanstack/react-query';
import axios from '../utils/axios';
import useUserInfo from './useUserInfo';

const useDashboardStatistics = () => {
  const { userInfo } = useUserInfo();
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['dashboardStatistics', userInfo?.id],
    queryFn: async () => {
      const res = await axios.get(`/admin/statistics`);
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
