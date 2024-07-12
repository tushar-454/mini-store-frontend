import { createBrowserRouter } from 'react-router-dom';
import Root from '../layout/Root';
import Cart from '../pages/Cart';
import Home from '../pages/Home';
import OrderSummary from '../pages/OrderSummary';
import ProductDetails from '../pages/ProductDetails';
import ProductFilter from '../pages/ProductFilter';
import Wishlists from '../pages/Wishlists';

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
    ],
  },
]);

export default router;
