import { useState } from 'react';
import paymentway from '../../assets/payment-way.webp';
const PaymentMethod = () => {
  const [method, setMethod] = useState('');

  return (
    <>
      <div>
        <h2 className='text-2xl font-semibold'>Payment Method</h2>
        <p className='text-lg text-gray-500'>
          Please enter your payment method
        </p>
      </div>
      {/* pay type  */}
      <div className='mt-10 flex gap-5'>
        <div className='flex items-center gap-2'>
          <input
            type='radio'
            name='payType'
            id='payOnline'
            className='accent-green-600'
            onChange={() => {
              localStorage.setItem('paymentMethod', 'Pay Online');
              setMethod('Pay Online');
            }}
            checked={localStorage.getItem('paymentMethod') === 'Pay Online'}
          />
          <label htmlFor='payOnline'> Pay Online</label>
        </div>

        <div className='flex items-center gap-2'>
          <input
            type='radio'
            name='payType'
            id='cod'
            className='accent-green-600'
            onChange={() => {
              localStorage.setItem('paymentMethod', 'Cash On Delivery');
              setMethod('Cash On Delivery');
            }}
            checked={
              localStorage.getItem('paymentMethod') === 'Cash On Delivery'
            }
          />
          <label htmlFor='cod'> Cash On Delivery</label>
        </div>
      </div>
      <div
        className={`transition-all ${method === 'Pay Online' ? 'opacity-100' : 'opacity-0'}`}
      >
        <img
          src={paymentway}
          alt=''
          className={`w-96 cursor-pointer ${method === 'Pay Online' && 'cursor-not-allowed'}`}
        />
      </div>
    </>
  );
};

export default PaymentMethod;
