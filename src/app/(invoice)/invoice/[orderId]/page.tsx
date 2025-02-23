'use client';
import { useOrderQuery } from '@/api/order';
import { assets } from '@/assets/assets';
import { Taka } from '@/components/shared/taka';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import {
  TypographyH4,
  TypographyLarge,
  TypographyMuted,
  TypographyP,
} from '@/components/ui/typography';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const Invoice = () => {
  const [invoiceId, setInvoiceId] = useState(0);
  const {
    data: { data: order } = {},
    isLoading,
    isError,
  } = useOrderQuery(invoiceId, { skip: !invoiceId });

  useEffect(() => {
    const path = window.location.pathname;
    const pathParts = path.split('/');
    const invoiceId = pathParts.pop();
    if (Number(invoiceId)) {
      document.title = `Invoice - ${invoiceId} - Mini Store`;
      setInvoiceId(Number(invoiceId));
    }
  }, []);

  if (isLoading)
    return (
      <div className='flex min-h-screen flex-col items-center justify-center gap-10'>
        <TypographyH4>Creating Invoice ...</TypographyH4>
        <LoadingSpinner />
      </div>
    );

  if (isError)
    return (
      <div className='flex h-screen flex-col items-center justify-center gap-10'>
        <TypographyLarge className='text-red-500'>
          Something is wrong while creating invoice.
        </TypographyLarge>
        <Button variant={'link'} onClick={() => window.history.back()}>
          Go Back
        </Button>
      </div>
    );

  return (
    <>
      {order && (
        <div className='invoice-body'>
          {/* Invoice Container */}
          <div className='invoice-container'>
            {/* Header */}
            <div className='invoice-header mb-8 text-center'>
              <div className='flex flex-col items-center gap-3'>
                <h1 className='text-3xl font-bold'>Invoice</h1>
                <Image
                  src={assets.logo1}
                  alt='Logo'
                  width={60}
                  height={60}
                  className='rounded-md'
                />
              </div>
              <div>
                <TypographyH4>Mini Store</TypographyH4>
                <TypographyP>Mohammadpur Dhaka Bangladesh</TypographyP>
              </div>
            </div>
            <span className='mb-6 block w-full border-b' />

            {/* From and To Details */}
            <div className='invoice-details mb-8 flex justify-between gap-5'>
              <div>
                <TypographyP className='font-semibold'>Order ID: {order.tracking_id} </TypographyP>
                <TypographyP>Mobile: {order.phone}</TypographyP>
                <TypographyP>Name: {order.name}</TypographyP>
                <TypographyP>
                  Address: {order.address}, {order.sub_district}, {order.district}, {order.division}
                </TypographyP>
                <TypographyP className='font-semibold'>
                  COD Tk: <Taka size={16} />
                  {order.price.toFixed(2)}
                </TypographyP>
              </div>
              <div>
                <TypographyP className='whitespace-nowrap font-semibold'>
                  Invoice #: {new Date().getTime().toString().slice(6)}
                </TypographyP>
                <TypographyP className='whitespace-nowrap'>
                  Date: {new Date().toDateString()}
                </TypographyP>
                <TypographyP className='whitespace-nowrap'>
                  Time: {new Date().toLocaleTimeString()}
                </TypographyP>
              </div>
            </div>

            {/* Table */}
            <table className='invoice-table mb-8 w-full'>
              <thead>
                <tr className='bg-gray-200'>
                  <th className='border p-2 text-left'>Image</th>
                  <th className='border p-2 text-left'>Product Info</th>
                  <th className='border p-2 text-left'>Price</th>
                  <th className='border p-2 text-left'>Total</th>
                </tr>
              </thead>
              <tbody>
                {order.line_items.map((item, index) => (
                  <tr key={index}>
                    <td className='max-w-16 border p-2'>
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={50}
                        height={50}
                        className='size-16 rounded object-cover'
                        onLoad={() => index === order.line_items.length - 1 && window.print()}
                      />
                    </td>
                    <td className='border p-2'>
                      <p className='font-semibold'>{item.name}</p>
                      <p className='italic'>{item.variant}</p>
                      <p className='text-sm'>Quantity: {item.quantity}</p>
                    </td>
                    <td className='whitespace-nowrap border p-2'>
                      <Taka size={16} />
                      {(item.price - item.price * (item.discount / 100)).toFixed(2)}
                    </td>
                    <td className='whitespace-nowrap border p-2'>
                      <Taka size={16} />
                      {(item.quantity * (item.price - item.price * (item.discount / 100))).toFixed(
                        2,
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Total Amount */}
            <div className='total-amount mb-6 text-right'>
              <TypographyP>
                Sub Total:{' '}
                {order.line_items
                  .reduce((acc, cur) => {
                    const curDiscount = cur.price * cur.quantity * (cur.discount / 100);
                    const curPrice = cur.price * cur.quantity;

                    return acc + curPrice - curDiscount;
                  }, 0)
                  .toFixed(2)}
              </TypographyP>
              <TypographyP>Shipping: {order.shipping}</TypographyP>
              <TypographyP>
                Discount:{' '}
                {order.line_items
                  .reduce((acc, cur) => acc + cur.quantity * (cur.price * (cur.discount / 100)), 0)
                  .toFixed(2)}
              </TypographyP>
              <TypographyP className='font-semibold'>Total: {order.price.toFixed(2)}</TypographyP>
            </div>

            {/* Footer */}
            <div className='invoice-footer text-center'>
              <TypographyMuted>Thank you for your ordering</TypographyMuted>
            </div>
          </div>

          {/* Print Button */}
          <button
            className='no-print fixed right-5 top-5 mt-4 bg-blue-500 px-4 py-2 text-white'
            onClick={() => window.print()}
          >
            Print Invoice
          </button>
        </div>
      )}
    </>
  );
};

export default Invoice;
