'use client';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { Badge } from '@/components/ui/badge';
import Gradient from '@/components/ui/gradient';
import { TypographyH3, TypographyLarge, TypographyP } from '@/components/ui/typography';
import { resetOrderDiscount, updateOrderLineItems } from '@/store/features/order';
import { AppDispatch, RootState } from '@/store/store';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Taka } from '../shared/taka';

const ProductsTable = () => {
  const carts = useSelector((state: RootState) => state.cart.carts);
  const order = useSelector((state: RootState) => state.order);
  const [totalPrice, setTotalPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (carts) {
      const lineItems = carts.map((cart) => {
        return {
          product_id: cart.product_id,
          name: cart.name,
          image: cart.image,
          variant: cart.variant?.name,
          quantity: cart.quantity,
        };
      });
      dispatch(updateOrderLineItems(lineItems));
      const result = carts.reduce(
        (acc, cur) => {
          const curDiscount = cur.price * cur.quantity * (cur.discount / 100);
          const curPrice = cur.price * cur.quantity;
          acc.discount = acc.discount + curDiscount;
          acc.total = acc.total + curPrice - curDiscount;
          return acc;
        },
        {
          discount: 0,
          total: 0,
        },
      );
      setTotalPrice(result.total);
      setDiscount(result.discount);
    }
  }, [carts, dispatch]);

  useEffect(() => {
    if (order.division === '30' && order.district === '26') {
      setShipping(70);
    } else {
      setShipping(120);
    }
    if (order.coupon_code.length > 0) {
      if (order.type === 'flat') {
        setCouponDiscount(order.discount);
      } else if (order.type === 'percentage') {
        setCouponDiscount((totalPrice - discount) * (order.discount / 100));
      }
    } else {
      dispatch(resetOrderDiscount());
      setCouponDiscount(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order, dispatch]);

  return (
    <div className='overflow-x-auto'>
      <Table className='min-w-[1024px] lg:w-full'>
        <TableCaption>Here is your all final product that you ordering now</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>
              <TypographyLarge>Product Details</TypographyLarge>
            </TableHead>
            <TableHead>
              <TypographyLarge>Discount Price</TypographyLarge>
            </TableHead>
            <TableHead>
              <TypographyLarge>Quantity</TypographyLarge>
            </TableHead>
            <TableHead className='text-right'>
              <TypographyLarge>Total Price</TypographyLarge>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {carts?.map((cart) => (
            <TableRow key={cart._id}>
              <TableCell>
                <div className='flex gap-2'>
                  {/* image and variant other details here */}
                  <Image
                    src={cart.image}
                    alt={cart.name}
                    width={50}
                    height={50}
                    className='size-16 rounded-lg object-cover'
                  />
                  <div className='flex flex-col gap-1'>
                    <TypographyP>{cart.name}</TypographyP>
                    <span className='flex flex-wrap items-center gap-1'>
                      <Badge variant={'default'} className='max-w-fit whitespace-nowrap'>
                        {cart.category}
                      </Badge>
                      <Badge variant={'default'} className='max-w-fit whitespace-nowrap'>
                        {cart.variant?.name} - {cart.variant?.price}
                      </Badge>
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className='flex flex-col gap-1'>
                  <TypographyLarge>
                    <Taka size={18} />
                    {+(cart.price - cart.price * (cart.discount / 100)).toFixed(2)}
                  </TypographyLarge>
                </div>
              </TableCell>
              <TableCell>
                <TypographyLarge>{cart.quantity}</TypographyLarge>
              </TableCell>
              <TableCell className='text-right'>
                <TypographyH3>
                  <Gradient>
                    <Taka />
                    {cart.price * cart.quantity -
                      cart.price * cart.quantity * (cart.discount / 100)}
                  </Gradient>
                </TypographyH3>
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={3} className='text-right'>
              <TypographyLarge>Total:</TypographyLarge>
            </TableCell>
            <TableCell colSpan={1} className='text-right'>
              <TypographyLarge>+ {totalPrice.toFixed(2)}</TypographyLarge>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={3} className='text-right'>
              <TypographyLarge>Discount:</TypographyLarge>
            </TableCell>
            <TableCell colSpan={1} className='text-right'>
              <TypographyLarge>- {discount.toFixed(2)}</TypographyLarge>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={3} className='text-right'>
              <TypographyLarge>Shipping:</TypographyLarge>
            </TableCell>
            <TableCell colSpan={1} className='text-right'>
              <TypographyLarge>+ {shipping}</TypographyLarge>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={3} className='text-right'>
              <TypographyLarge>Coupon Discount:</TypographyLarge>
            </TableCell>
            <TableCell colSpan={1} className='text-right'>
              <TypographyLarge>- {couponDiscount.toFixed(2)}</TypographyLarge>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={3} className='text-right'>
              <TypographyLarge>Nit Total:</TypographyLarge>
            </TableCell>
            <TableCell colSpan={1} className='text-right'>
              <TypographyLarge>
                +{' '}
                {totalPrice + shipping - couponDiscount < 0
                  ? 0
                  : (totalPrice + shipping - couponDiscount).toFixed(2)}
              </TypographyLarge>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export { ProductsTable };
