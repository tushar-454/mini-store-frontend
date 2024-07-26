import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../Hook/useAuth';
import Loading from '../components/shared/Loading';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation();
  const { user, loading } = useAuth();
  if (loading) return <Loading />;
  if (!user) {
    return <Navigate to='/login' state={pathname} />;
  }
  return children;
};

export default PrivateRoute;
