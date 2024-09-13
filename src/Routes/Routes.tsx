import { createBrowserRouter } from 'react-router-dom';
import Dashboard from '../components/Dashboard/Dashboard';
import OrdersDashboard from '../components/Dashboard/OrdersDashboard';
import ProductsDashboard from '../components/Dashboard/ProductsDashboard';
import UsersDashboard from '../components/Dashboard/UsersDashboard';
import Order from '../components/Profile/Order';
import ProfileSub from '../components/Profile/Profile';
import Shipping from '../components/Profile/Shipping';
import Root from '../layout/Root';
import Cancel from '../pages/Cancel';
import Cart from '../pages/Cart';
import DashboardLayout from '../pages/Dashboard';
import Fail from '../pages/Fail';
import Home from '../pages/Home';
import Login from '../pages/Login';
import OrderSummary from '../pages/OrderSummary';
import ProductDetails from '../pages/ProductDetails';
import ProductFilter from '../pages/ProductFilter';
import Profile from '../pages/Profile';
import Signup from '../pages/Signup';
import Success from '../pages/Success';
import Wishlists from '../pages/Wishlists';
import AdminRoutes from './AdminRoutes';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'product/filter',
        element: <ProductFilter />,
      },
      {
        path: 'product/:id',
        element: <ProductDetails />,
      },
      {
        path: 'wishlist',
        element: (
          <PrivateRoute>
            <Wishlists />
          </PrivateRoute>
        ),
      },
      {
        path: 'cart',
        element: (
          <PrivateRoute>
            <Cart />
          </PrivateRoute>
        ),
      },
      {
        path: 'order',
        element: (
          <PrivateRoute>
            <OrderSummary />
          </PrivateRoute>
        ),
      },
      {
        path: 'success',
        element: (
          <PrivateRoute>
            <Success />
          </PrivateRoute>
        ),
      },
      {
        path: 'fail',
        element: (
          <PrivateRoute>
            <Fail />
          </PrivateRoute>
        ),
      },
      {
        path: 'cancel',
        element: (
          <PrivateRoute>
            <Cancel />
          </PrivateRoute>
        ),
      },
      {
        path: 'profile',
        element: (
          <PrivateRoute>
            <Profile />,
          </PrivateRoute>
        ),
        children: [
          {
            index: true,
            element: <ProfileSub />,
          },
          {
            path: 'order',
            element: <Order />,
          },
          {
            path: 'shipping',
            element: <Shipping />,
          },
          {
            path: 'review',
            element: <p>reviews</p>,
          },
        ],
      },
      {
        path: 'dashboard',
        element: (
          <AdminRoutes>
            <PrivateRoute>
              <DashboardLayout />,
            </PrivateRoute>
          </AdminRoutes>
        ),
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
          {
            path: 'users',
            element: <UsersDashboard />,
          },
          {
            path: 'products',
            element: <ProductsDashboard />,
          },
          {
            path: 'orders',
            element: <OrdersDashboard />,
          },
        ],
      },
    ],
  },
  {
    path: '/login',
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: '/signup',
    element: (
      <PublicRoute>
        <Signup />
      </PublicRoute>
    ),
  },
]);

export default router;
