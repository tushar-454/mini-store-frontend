import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../components/shared/Loading';
import useUserInfo from '../Hook/useUserInfo';

const AdminRoutes = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation();
  const { userInfo, isUserLoad } = useUserInfo();
  if (isUserLoad) return <Loading />;
  if (userInfo?.data.role !== 'admin') {
    return <Navigate to='/profile' state={pathname} />;
  }
  return children;
};

export default AdminRoutes;
