import { TCoupon } from '@/api/coupon';
import { Button } from '@/components/ui/button';
import Gradient from '@/components/ui/gradient';
import { Input } from '@/components/ui/input';
import { TypographyH4, TypographySmall } from '@/components/ui/typography';
import { BASE_URL } from '@/constant';
import { resetOrderDiscount, updateOrderDiscount } from '@/store/features/order';
import { AppDispatch, RootState } from '@/store/store';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const CouponCode = () => {
  const [code, setCode] = useState('');
  const [placeholder, setPlaceholder] = useState('');
  const order = useSelector((state: RootState) => state.order);
  const { carts } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch<AppDispatch>();
  const totalPrice = carts.reduce((acc, item) => acc + item.totalPrice, 0);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (code === '') return setPlaceholder('Enter coupon');
    try {
      const res: Response = await fetch(`${BASE_URL}/coupon/${code}`);
      const data = await res.json();
      if (data.success === false) {
        dispatch(resetOrderDiscount());
        setPlaceholder(data.message);
        return;
      }
      if (data.success && data.data) {
        const { code, discount, quantity, minprice, startAt, expireAt, type } =
          data.data as TCoupon;

        if (new Date(startAt).getTime() > new Date().getTime())
          return setPlaceholder('Coupon not start yet.');
        if (new Date(expireAt).getTime() < new Date().getTime())
          return setPlaceholder('Coupon is Expire.');
        if (quantity === 0) return setPlaceholder('Coupon quantity finished');
        if (totalPrice < minprice)
          return setPlaceholder(`Minimum ${minprice} amount is required for this coupon`);
        dispatch(updateOrderDiscount({ discount, type, code }));
        setPlaceholder('Coupon applied');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <TypographyH4>
        <Gradient>Apply Coupon Code</Gradient>
      </TypographyH4>

      <form onSubmit={onSubmit} className='mt-3 flex w-full md:max-w-[768px]'>
        <Input
          placeholder='AHMC10'
          className='w-3/4 rounded-r-none'
          value={code}
          onChange={(e) => setCode(e.target.value)}
          disabled={order.discount !== 0}
        />
        {order.discount === 0 ? (
          <Button type='submit' variant={'default'} className='w-1/4 min-w-fit rounded-l-none'>
            Apply Coupon
          </Button>
        ) : (
          <Button
            variant={'destructive'}
            className='w-1/4 min-w-fit rounded-l-none'
            onClick={() => {
              setCode('');
              dispatch(resetOrderDiscount());
            }}
          >
            Remove Coupon
          </Button>
        )}
      </form>

      {placeholder && (
        <TypographySmall
          className={`mt-2 ${order.discount ? 'text-muted-foreground' : 'text-red-500'}`}
        >
          {placeholder}
        </TypographySmall>
      )}
    </div>
  );
};

export { CouponCode };
