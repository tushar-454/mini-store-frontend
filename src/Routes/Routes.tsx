import { createBrowserRouter } from 'react-router-dom';
import Root from '../layout/Root';
import Home from '../pages/Home';
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
    ],
  },
]);

export default router;
