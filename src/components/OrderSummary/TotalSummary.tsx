const TotalSummary = () => {
  return (
    <div className='flex flex-col justify-between gap-10 md:flex-row'>
      {/* shopping address and payment method confirm */}
      <div className='w-full space-y-10 md:w-1/2'>
        <div>
          <div className='flex justify-between'>
            <p className='text-lg font-semibold'>Shopping Address</p>
            <button className='secondaryBtn'>Change</button>
          </div>
          <ul>
            <li>
              Name: <b>Jhone Dou</b>
            </li>
            <li>
              Phone: <b>+84059345</b>
            </li>
            <li>
              City: <b>Dhaka</b>
            </li>
            <li>
              Area: <b>Mirpur - 10</b>
            </li>
            <li>
              Address: <b>Mirpur Shah Ali Plaza 4th Floor, House No - 230</b>
            </li>
          </ul>
        </div>
        <div>
          <div className='flex justify-between'>
            <p className='text-lg font-semibold'>Payment Method</p>
            <button className='secondaryBtn'>Change</button>
          </div>
          <span>
            <img
              src='https://www.logo.wine/a/logo/Nagad/Nagad-Logo.wine.svg'
              alt=''
              className='w-72'
            />
          </span>
        </div>
      </div>
      <div className='w-full md:w-1/2'>
        <p className='mb-3 text-xl font-bold'>Cart Total</p>
        <ul className='pb-2'>
          <p className='mb-2 flex items-center justify-between border-b'>
            <b>Product</b>
            <b>Price</b>
          </p>
          <li className='flex items-center justify-between'>
            <span>1. Product 1</span>
            <span>100</span>
          </li>
          <li className='flex items-center justify-between'>
            <span>2. Product 2</span>
            <span>100</span>
          </li>
        </ul>
        {/* subtotal  */}
        <ul className='border-t py-2'>
          <li className='flex items-center justify-between'>
            <span>Sub Total</span>
            <span>200</span>
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
            />
            <span className='primaryBtn'>Apply</span>
          </li>
        </ul>
        {/* total  */}
        <ul className='border-t py-2'>
          <li className='flex items-center justify-between'>
            <span>Total</span>
            <span>300</span>
          </li>
        </ul>
        <button className='primaryBtn my-5'>Place Order</button>
      </div>
    </div>
  );
};

export default TotalSummary;
