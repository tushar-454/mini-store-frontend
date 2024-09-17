interface PaymentMethodProps {
  setMethod: React.Dispatch<React.SetStateAction<string>>;
}

import React from 'react';

const PaymentMethod: React.FC<PaymentMethodProps> = ({ setMethod }) => {
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
              setMethod('payOnline');
            }}
            checked={true}
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
              setMethod('CashOnDelivery');
            }}
          />
          <label htmlFor='cod'> Cash On Delivery</label>
        </div>
      </div>
    </>
  );
};

export default PaymentMethod;
