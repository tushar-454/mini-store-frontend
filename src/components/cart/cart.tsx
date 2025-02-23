'use client';
import { removeCartItem, updateCartItem } from '@/store/features/cart';
import { AppDispatch, RootState } from '@/store/store';
import { Plus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { Taka } from '../shared/taka';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import Gradient from '../ui/gradient';
import { Separator } from '../ui/separator';
import { TypographyH3, TypographyLarge, TypographyMuted, TypographyP } from '../ui/typography';

type CartProps = {
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
};

export type TCart = {
  _id: string;
  product_id: string;
  image: string;
  name: string;
  category: string;
  variant: {
    _id: string;
    name: string;
    price: number;
  };
  price: number;
  discount: number;
  quantity: number;
  totalPrice: number;
};

const Cart = ({ cartOpen, setCartOpen }: CartProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const carts = useSelector((state: RootState) => state.cart.carts);

  const addQuantity = (id: string) => {
    dispatch(updateCartItem({ id, type: 'increment' }));
  };
  const removeQuantity = (id: string) => {
    dispatch(updateCartItem({ id, type: 'decrement' }));
  };
  const writeQuantity = (id: string, quantity: number) => {
    dispatch(updateCartItem({ id, quantity }));
  };

  return (
    <>
      <span
        className={`fixed left-0 top-0 z-[999999999] h-full w-full bg-black/50 ${cartOpen ? 'visible opacity-100 backdrop-blur-sm' : 'invisible opacity-0'} transition-all duration-500`}
        onClick={() => setCartOpen(false)}
      ></span>
      <div
        className={`fixed top-0 z-[999999999] h-full w-full bg-white p-5 transition-all duration-300 sm:w-[640px] ${cartOpen ? 'right-0' : '-right-full'}`}
      >
        {/* cart wrapper here  */}
        <div className='flex h-full flex-col justify-between'>
          {/* head and content here  */}
          <div>
            {/* cart header */}
            <div className='flex items-center justify-between gap-2'>
              <TypographyH3>
                <Gradient>Cart</Gradient>
              </TypographyH3>
              <Button variant={'destructive'} onClick={() => setCartOpen(false)}>
                Close
              </Button>
            </div>
            <Separator className='my-3' />
            {/* cart content here  */}
            <div className='max-h-[calc(100vh-10rem)] overflow-y-auto'>
              {!carts ||
                (Array.isArray(carts) && carts.length === 0 && (
                  <TypographyMuted className='text-center'>No carts item found</TypographyMuted>
                ))}
              {Array.isArray(carts) &&
                carts.length > 0 &&
                carts.map((cart) => (
                  <div key={cart._id} className='mt-5 flex flex-col justify-between gap-2 p-1'>
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
                            {cart.variant?.name}
                          </Badge>
                        </span>
                      </div>
                    </div>
                    {/* down section 4 items */}
                    <div className='flex w-full flex-wrap items-center justify-between gap-2 p-1'>
                      {/* price and discount  */}
                      <div className='flex flex-col gap-1'>
                        <TypographyLarge>
                          <Taka />
                          {cart.price}
                        </TypographyLarge>
                        <Badge variant={'destructive'} className='max-w-fit whitespace-nowrap'>
                          <Taka />
                          {cart.discount}% Off
                        </Badge>
                      </div>
                      {/* total price  */}
                      <div>
                        <TypographyH3>
                          <Gradient>
                            <Taka />
                            {cart.totalPrice}
                          </Gradient>
                        </TypographyH3>
                      </div>
                      {/* quantity and remove button  */}
                      <div className='flex max-w-[150px] items-center px-2'>
                        <div className='flex w-full items-center rounded-lg border'>
                          <span
                            onClick={() => removeQuantity(cart._id)}
                            className='grid h-auto w-fit flex-grow cursor-pointer place-content-center px-2 text-lg hover:bg-black/10'
                          >
                            -
                          </span>
                          <span
                            onDoubleClick={(e) => (e.currentTarget.contentEditable = 'true')}
                            onBlur={(e) => writeQuantity(cart._id, +e.currentTarget.textContent!)}
                            className='grid h-auto w-fit flex-grow place-content-center border-x px-2 text-lg'
                          >
                            {cart.quantity}
                          </span>
                          <span
                            onClick={() => addQuantity(cart._id)}
                            className='grid h-auto w-fit flex-grow cursor-pointer place-content-center px-2 text-lg hover:bg-black/10'
                          >
                            +
                          </span>
                        </div>
                      </div>
                      <Button
                        variant={'destructive'}
                        className='size-10'
                        onClick={() => dispatch(removeCartItem(cart._id))}
                      >
                        <Plus className='rotate-45' />
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          {/* cart footer here */}
          <Link href={'/checkout'} onClick={() => setCartOpen(false)}>
            <Button variant={'default'} className='flex-end w-full'>
              Checkout
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Cart;
