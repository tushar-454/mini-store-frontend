import { Suspense } from 'react';
import ProductUpdate from './product_update';

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductUpdate />
    </Suspense>
  );
};

export default page;
