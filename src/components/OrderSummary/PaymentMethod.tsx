import paymentway from '../../assets/payment-way.webp';
const PaymentMethod = () => {
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
          />
          <label htmlFor='payOnline'> Pay Online</label>
        </div>

        <div className='flex items-center gap-2'>
          <input
            type='radio'
            name='payType'
            id='cod'
            className='accent-green-600'
          />
          <label htmlFor='cod'> Cash On Delivery</label>
        </div>
      </div>
      <div>
        <img src={paymentway} alt='' className='w-96 cursor-pointer' />
      </div>
    </>
  );
};

export default PaymentMethod;
