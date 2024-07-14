import { useContext } from 'react';
import { AuthContext, UserInfo } from '../AuthProvider/AuthProvider';

const useAuth: () => UserInfo = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export default useAuth;
