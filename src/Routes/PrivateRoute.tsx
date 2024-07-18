import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../Hook/useAuth';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation();
  const { user } = useAuth();
  if (!user) {
    return <Navigate to='/login' state={pathname} />;
  }
  return children;
};

export default PrivateRoute;
