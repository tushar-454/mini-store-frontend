'use client';
import { useOrderQuery } from '@/api/order';
import { TextField } from '@/components/generic_form/fields/TextField';
import { GenericForm, GenericFormRef } from '@/components/generic_form/generic_form';
import CreateReview from '@/components/reviews/create-review';
import { Container } from '@/components/shared/container';
import { Taka } from '@/components/shared/taka';
import { Button } from '@/components/ui/button';
import Gradient from '@/components/ui/gradient';
import {
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyP,
  TypographySmall,
} from '@/components/ui/typography';
import { TRACKING_STATUS } from '@/constant';
import { capitalizeFirstLetter, formatDate } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { z } from 'zod';

const schema = z.object({
  trackingId: z.string().length(9, {
    message: 'Tracking id should be 9 characters long',
  }),
});

export type FormType = z.infer<typeof schema>;

const TrackOrder = () => {
  const [showModal, setShowModal] = useState(false);
  const [trackingId, setTrackingId] = useState(0);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const {
    data: { data: order } = {},
    isLoading,
    isError,
    refetch,
  } = useOrderQuery(trackingId, { skip: trackingId === 0 });
  const formRef = useRef<GenericFormRef<FormType>>(null);
  const initialValues: FormType = {
    trackingId: '',
  };

  const handleSubmit = async (data: FormType | React.FormEvent<HTMLFormElement>) => {
    if ('trackingId' in data) {
      setTrackingId(+data.trackingId);
      refetch();
    }
  };

  useEffect(() => {
    const pathname = window.location.pathname;
    const id = pathname.split('/').pop();
    if (id) {
      formRef.current?.setValue('trackingId', id as string);
      buttonRef.current?.click();
    }
  }, []);

  return (
    <>
      <main className='min-h-screen'>
        <Container>
          <div className='mx-auto w-full space-y-4 pt-8 sm:w-[500px] sm:pt-16'>
            <TypographyH2 className='text-center'>
              <Gradient>Track Order Now</Gradient>
            </TypographyH2>

            <div className='flex justify-center'>
              <GenericForm
                schema={schema}
                initialValues={initialValues}
                onSubmit={handleSubmit}
                ref={formRef}
              >
                <div className='flex'>
                  <TextField<FormType>
                    name='trackingId'
                    type='number'
                    placeholder='enter your order tracking id'
                    className='w-full sm:w-[500px]'
                    inputClass='rounded-r-none'
                  />
                  <Button type='submit' className='rounded-l-none' ref={buttonRef}>
                    Track Order
                  </Button>
                </div>
              </GenericForm>
            </div>
            {!isLoading && isError && (
              <TypographyH3>
                <Gradient>No Order Found</Gradient>
              </TypographyH3>
            )}
            {!isLoading && !isError && order && (
              <div className='mx-auto max-w-2xl rounded-lg border-t-4 border-primary bg-white p-6 shadow-lg'>
                <TypographyH2 className='mb-4 text-center text-primary'>
                  Order Tracking Details
                </TypographyH2>

                <div className='mt-6'>
                  <TypographyH3 className='text-gray-700'>
                    Order ID: <span className='font-bold text-primary'>{order.tracking_id}</span>
                  </TypographyH3>
                  <TypographyP className='mt-2 text-gray-600'>
                    <span className='font-semibold'>Order Date: </span>
                    <span className='font-semibold text-primary'>
                      {formatDate(order.createdAt)}
                    </span>
                  </TypographyP>
                  <TypographyP className='mt-2 text-gray-600'>
                    <span className='font-semibold'>Street Address:</span> {order.address}
                  </TypographyP>

                  <TypographyP className='mt-2 text-gray-600'>
                    <span className='font-semibold'>Address: </span> {order.sub_district} -{' '}
                    {order.district} - {order.division}
                  </TypographyP>

                  <TypographyP className='mt-2 text-gray-600'>
                    <span className='font-semibold'>Phone Number: </span>
                    <a href={`tel:${order.phone}`}>{order.phone}</a>
                  </TypographyP>

                  <div
                    className={`mt-4 flex flex-wrap justify-between gap-5 rounded-lg border-l-4 ${order.status === 'cancelled' ? 'border-red-500' : 'border-primary'} ${order.status === 'cancelled' ? 'bg-red-50' : 'bg-green-50'} p-4`}
                  >
                    <div>
                      <TypographyH4 className='text-md font-semibold text-gray-700'>
                        Current Status:
                      </TypographyH4>
                      <TypographyP className='mt-1 text-primary'>
                        {capitalizeFirstLetter(order.status)}
                      </TypographyP>
                    </div>
                    <Button
                      onClick={() => setShowModal(true)}
                      disabled={order.isReviewed || order.status !== 'delivered'}
                    >
                      {order.isReviewed ? 'Review Done' : 'Review Now'}
                    </Button>
                  </div>

                  <div className='mt-6'>
                    <TypographyH4 className='text-gray-700'>Tracking Progress:</TypographyH4>
                    <div
                      className={`relative mt-2 h-3 w-full rounded-full ${order.status === 'cancelled' ? 'bg-red-500' : 'bg-gray-300'} shadow-inner`}
                    >
                      <div
                        className={`absolute h-3 rounded-full bg-primary ${
                          order.status === 'cancelled'
                            ? 'w-[0%]'
                            : order.status === 'pending'
                              ? 'w-[2%]'
                              : order.status === 'confirm'
                                ? 'w-[calc(25%+3rem)]'
                                : order.status === 'shipped'
                                  ? 'w-[calc(50%+3rem)]'
                                  : 'w-[100%]'
                        }`}
                      ></div>
                    </div>
                    <div className='mt-2 flex justify-between text-sm font-medium text-gray-600'>
                      {TRACKING_STATUS.map((status) => (
                        <span
                          key={status}
                          className={`${order.status.toLowerCase() === status.toLowerCase() ? 'text-primary' : 'text-gray-500'}`}
                        >
                          {status}
                        </span>
                      ))}
                    </div>
                    {/* order summary section  */}
                    <div className='mt-6'>
                      <TypographyH4 className='text-md font-semibold text-gray-700'>
                        Order Summary: {order.line_items.length} Items
                      </TypographyH4>
                      <div>
                        {order?.line_items?.map((item) => (
                          <Link
                            href={`/products/${item.name.toLowerCase().split(' ').join('-')}`}
                            key={item._id}
                            className='mt-4 block rounded-lg border bg-white p-4 shadow'
                          >
                            <div className='flex items-center gap-4'>
                              <Image
                                src={item.image}
                                alt={item.name}
                                width={100}
                                height={100}
                                className='h-16 w-16 rounded-lg border'
                              />
                              <div>
                                <h5 className='font-semibold text-primary'>{item.name}</h5>
                                <TypographyP className='text-sm text-gray-600'>
                                  Quantity: <span className='font-semibold'>{item.quantity}</span>
                                </TypographyP>
                                <TypographyP className='text-sm text-gray-600'>
                                  Variant: <span className='font-semibold'>{item.variant}</span>
                                </TypographyP>
                                <TypographySmall className='text-gray-600'>
                                  Total Price:{' '}
                                  <span className='font-semibold'>
                                    <Taka size={16} /> {item.price * item.quantity}
                                  </span>
                                </TypographySmall>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <CreateReview
                  orderId={order._id}
                  showModal={showModal}
                  setShowModal={setShowModal}
                  refetch={refetch}
                />
              </div>
            )}
          </div>
        </Container>
      </main>
    </>
  );
};

export default TrackOrder;
