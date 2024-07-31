import { useEffect } from 'react';
import useDashboardStatistics from '../../Hook/useDashboardStatistics';
import Loading from '../shared/Loading';
import DashboardInfoCard from './DashboardInfoCard';

const Dashboard = () => {
  const {
    dashboardStatistics,
    isDashboardStatisticsLoad,
    isDashboardStatisticsError,
    refetch,
  } = useDashboardStatistics();
  useEffect(() => {
    const intervalId = setInterval(() => {
      refetch();
    }, 60 * 1000);
    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <section>
      {/* show some Dashboard statistics */}
      {isDashboardStatisticsLoad && <Loading />}
      {isDashboardStatisticsError && (
        <p>There was an error while statistics fetching</p>
      )}
      {!isDashboardStatisticsLoad && dashboardStatistics && (
        <div className='mb-10 flex flex-wrap justify-between gap-5'>
          <DashboardInfoCard
            title='Total Users'
            value={dashboardStatistics?.data.totalUsers || 0}
            theme='green'
          />
          <DashboardInfoCard
            title='Total Products'
            value={dashboardStatistics?.data.totalProducts || 0}
            theme='green'
          />
          <DashboardInfoCard
            title='Total Sells'
            value={dashboardStatistics?.data.totalSells || 0}
            theme='green'
          />
          <DashboardInfoCard
            title='Pending Orders'
            value={dashboardStatistics?.data.totalPendingOrders || 0}
            theme='yellow'
          />
          <DashboardInfoCard
            title='Confirm Orders'
            value={dashboardStatistics?.data.totalConfimedOrders || 0}
            theme='yellow'
          />
          <DashboardInfoCard
            title='Completed orders'
            value={dashboardStatistics?.data.totalCompletedOrders || 0}
            theme='green'
          />
          <DashboardInfoCard
            title='Total Cancellation'
            value={dashboardStatistics?.data.totalCancelledOrders || 0}
            theme='red'
          />
          <DashboardInfoCard
            title='Total Orders'
            value={dashboardStatistics?.data.totalOrders || 0}
            theme='green'
          />
        </div>
      )}
    </section>
  );
};

export default Dashboard;
