import { carousel } from '@/api/carousel';
import { category } from '@/api/category';
import { coupon } from '@/api/coupon';
import { gallery } from '@/api/gallery';
import { order as apiOrder } from '@/api/order'; // Alias the order import
import { product } from '@/api/product';
import { reviews } from '@/api/reviews';
import { user } from '@/api/user';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cart';
import globalReducer from './features/globalReducer';
import orderReducer from './features/order';

const store = configureStore({
  reducer: {
    global: globalReducer,
    cart: cartReducer,
    order: orderReducer,
    [category.reducerPath]: category.reducer,
    [carousel.reducerPath]: carousel.reducer,
    [product.reducerPath]: product.reducer,
    [reviews.reducerPath]: reviews.reducer,
    [gallery.reducerPath]: gallery.reducer,
    [coupon.reducerPath]: coupon.reducer,
    [apiOrder.reducerPath]: apiOrder.reducer,
    [user.reducerPath]: user.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(category.middleware)
      .concat(carousel.middleware)
      .concat(product.middleware)
      .concat(reviews.middleware)
      .concat(gallery.middleware)
      .concat(coupon.middleware)
      .concat(apiOrder.middleware)
      .concat(user.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export { store };
