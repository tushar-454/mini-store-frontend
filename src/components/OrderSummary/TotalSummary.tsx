interface TotalSummaryProps {
  setCurSummary: React.Dispatch<React.SetStateAction<string>>;
}

import axios from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import useUserInfo from '../../Hook/useUserInfo';
import { CartItemType } from '../../pages/ProductDetails';

const TotalSummary: React.FC<TotalSummaryProps> = ({ setCurSummary }) => {
  const { userInfo, isUserLoad, isUserError } = useUserInfo();
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();
  // handle place order
  const handlePlaceOrder = async () => {
    try {
      setLoading(true);
      const newOrder = {
        userId: userInfo?.data._id,
        price: parseFloat((totalPrice + 100).toFixed(2)),
        orderItem: carts,
      };
      const res = await axios.post(
        `${import.meta.env.VITE_baseurl}/users/order`,
        newOrder,
      );
      if (res.data.status === 201) {
        localStorage.removeItem('carts');
        setCurSummary('confirm');
        toast.success('Order Successfully.');
        setTimeout(() => {
          navigate('/');
        }, 1500);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const cart = localStorage.getItem('carts');
    if (cart) {
      const cartObj = JSON.parse(cart);
      setCarts(cartObj);
      setTotalPrice(
        cartObj?.reduce((acc: number, cur: CartItemType) => acc + cur.price, 0),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='flex flex-col justify-between gap-10 md:flex-row'>
      {/* shopping address and payment method confirm */}
      <div className='w-full space-y-10 md:w-1/2'>
        {isUserError && <p className='py-10 text-lg'>There was an error.</p>}
        {!isUserLoad && !isUserError && userInfo && (
          <div>
            <div className='flex justify-between'>
              <p className='text-lg font-semibold'>Shopping Address</p>
              <button
                className='secondaryBtn'
                onClick={() => setCurSummary('shipping')}
              >
                Change
              </button>
            </div>
            <ul>
              <li>
                Name: <b>{userInfo?.data.name}</b>
              </li>
              <li>
                Phone: <b>{userInfo?.data.phone}</b>
              </li>
              <li>
                City: <b>{userInfo?.data.city}</b>
              </li>
              <li>
                Area: <b>{userInfo?.data.area}</b>
              </li>
              <li>
                Address: <b>{userInfo?.data.address}</b>
              </li>
            </ul>
          </div>
        )}
        <div>
          <div className='flex justify-between'>
            <p className='text-lg font-semibold'>Payment Method</p>
            <button
              className='secondaryBtn'
              onClick={() => setCurSummary('payment')}
            >
              Change
            </button>
          </div>
          <span className='block py-5'>
            {localStorage.getItem('paymentMethod')}
          </span>
        </div>
      </div>
      {/* cart total confirm */}
      <div className='w-full md:w-1/2'>
        <p className='mb-3 text-xl font-bold'>Cart Total</p>
        <ul className='pb-2'>
          <p className='mb-2 flex items-center justify-between border-b'>
            <b>Product</b>
            <b>Price</b>
          </p>
          {carts?.map((cart: CartItemType, index: number) => (
            <li
              key={Math.random()}
              className='flex items-center justify-between'
            >
              <span>
                {++index}
                {')'} {cart.name}2
              </span>
              <span>{cart.price}</span>
            </li>
          ))}
        </ul>
        {/* subtotal  */}
        <ul className='border-t py-2'>
          <li className='flex items-center justify-between'>
            <span>Sub Total</span>
            <span>{totalPrice}</span>
          </li>
        </ul>
        {/* shipping charge  */}
        <ul className='border-t py-2'>
          <li className='flex items-center justify-between'>
            <span>(+) Shipping Charge</span>
            <span>100</span>
          </li>
          <li className='mb-2 mt-4 font-bold'>
            <label htmlFor='coupon'>Apply Coupon</label>
          </li>
          <li className='flex flex-wrap items-center gap-3'>
            <input
              type='text'
              id='coupon'
              name='coupon'
              placeholder='Enter Coupon Code'
              className='rounded-lg border px-4 py-2 font-medium outline-none'
              disabled
            />
            <button className='primaryBtn' disabled>
              Apply
            </button>
          </li>
        </ul>
        {/* total  */}
        <ul className='border-t py-2'>
          <li className='flex items-center justify-between'>
            <span>Total</span>
            <span>{totalPrice + 100}</span>
          </li>
        </ul>
        <button
          type='button'
          className='primaryBtn my-5 disabled:cursor-not-allowed disabled:opacity-75'
          disabled={loading ? true : false}
          onClick={handlePlaceOrder}
        >
          {loading ? (
            <span className='flex items-center justify-center'>
              <svg className='mr-3 h-5 w-5 animate-spin' viewBox='0 0 24 24'>
                <circle
                  className='opacity-25'
                  cx='12'
                  cy='12'
                  r='10'
                  stroke='currentColor'
                  strokeWidth='4'
                ></circle>
                <path
                  className='opacity-75'
                  fill='currentColor'
                  d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                ></path>
              </svg>
              Processing...
            </span>
          ) : (
            'Place Order'
          )}
        </button>
      </div>
    </div>
  );
};

export default TotalSummary;
