'use client';
import { Suspense } from 'react';
import OrdersPage from './orders_page';

const Orders = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrdersPage />
    </Suspense>
  );
};

export default Orders;
