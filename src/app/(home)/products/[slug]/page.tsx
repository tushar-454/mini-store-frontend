'use client';
import { useGetProductBySlugQuery } from '@/api/product';
import AddToCart from '@/components/cakes_details/add_to_cart';
import { CakeDetailsSkeleton } from '@/components/cakes_details/cake_details_skeleton';
import { CakeError } from '@/components/cakes_details/cake_error';
import { CakesImages } from '@/components/cakes_details/cakes_images';
import { Container } from '@/components/shared/container';
import { InnerHTML } from '@/components/shared/inner_html';
import { Rating } from '@/components/shared/rating';
import { Taka } from '@/components/shared/taka';
import { Badge } from '@/components/ui/badge';
import { setSelectedImage } from '@/store/features/globalReducer';
import { AppDispatch } from '@/store/store';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const CakeDetails = () => {
  const { slug } = useParams();
  const {
    data: { data: cake } = {},
    isLoading,
    isError,
  } = useGetProductBySlugQuery(slug as string);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(setSelectedImage(cake?.images[0] || ''));
  }, [cake, dispatch]);

  return (
    <main className='min-h-screen'>
      <Container>
        {isLoading && <CakeDetailsSkeleton />}
        {isError && <CakeError />}
        {!isLoading && !isError && cake && (
          <div className='my-8 flex flex-wrap'>
            {/*  Product Images  */}
            <CakesImages images={cake.images} />

            {/*  Product Details  */}
            <div className='w-full px-4 md:w-1/2'>
              <h2 className='mb-2 text-3xl font-bold'>{cake.name}</h2>
              <Badge variant={'secondary'}>{cake.category}</Badge>
              <div className='my-2'>
                <span className='mr-2 text-2xl font-bold'>
                  <Taka size={24} />
                  {cake.price - cake.price * (cake.discount / 100)}
                </span>
                <span className='text-gray-500 line-through'>
                  <Taka size={10} />
                  {cake.price}
                </span>
              </div>

              <div className='mb-1 flex items-center gap-2'>
                <Rating rating={cake.rating} />
                {cake.rating}
              </div>
              <Badge variant={'destructive'}>{cake.sell_count} - Sells</Badge>
              <pre className='my-4 text-gray-700' style={{ fontFamily: 'inherit' }}>
                <InnerHTML content={cake.description} />
              </pre>
              <AddToCart cake={cake} />
            </div>
          </div>
        )}
      </Container>
    </main>
  );
};

export default CakeDetails;

// export async function generateStaticParams() {
//   const res: Response = await fetch(`${BASE_URL}/product`);
//   const { data: products }: TProductResponse = await res.json();

//   return products.map((product) => ({
//     id: product.slug,
//   }));
// }
