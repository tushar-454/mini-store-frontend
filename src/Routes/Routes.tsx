import { createBrowserRouter } from 'react-router-dom';
import Order from '../components/Profile/Order';
import ProfileSub from '../components/Profile/Profile';
import Shipping from '../components/Profile/Shipping';
import Root from '../layout/Root';
import Cart from '../pages/Cart';
import Home from '../pages/Home';
import Login from '../pages/Login';
import OrderSummary from '../pages/OrderSummary';
import ProductDetails from '../pages/ProductDetails';
import ProductFilter from '../pages/ProductFilter';
import Profile from '../pages/Profile';
import Signup from '../pages/Signup';
import Wishlists from '../pages/Wishlists';
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
        element: <Wishlists />,
      },
      {
        path: 'cart',
        element: <Cart />,
      },
      {
        path: 'order',
        element: <OrderSummary />,
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
