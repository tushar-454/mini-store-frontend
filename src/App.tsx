import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import AuthProvider from './AuthProvider/AuthProvider';
import router from './Routes/Routes';

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster />
    </AuthProvider>
  );
};

export default App;
