const ShippingAddress = () => {
  return (
    <>
      <div>
        <h2 className='text-2xl font-semibold'>Shipping Address</h2>
        <p className='text-lg text-gray-500'>
          Please enter your shipping address
        </p>
      </div>
      <form className='my-10 w-full space-y-6 lg:w-1/2'>
        {/* name and contact */}
        <div className='flex w-full flex-col gap-5 sm:flex-row'>
          <div className='grid w-full gap-1'>
            <label htmlFor='name' className='text-lg font-semibold'>
              Name
            </label>
            <input
              type='text'
              id='name'
              name='name'
              placeholder='Jhon Dou'
              className='primaryInput'
            />
          </div>
          <div className='grid w-full gap-1'>
            <label htmlFor='contact' className='text-lg font-semibold'>
              Contact No
            </label>
            <input
              type='tel'
              id='contact'
              name='contact'
              placeholder='+054798690454'
              className='primaryInput'
            />
          </div>
        </div>
        {/* area and city */}
        <div className='flex w-full flex-col gap-5 sm:flex-row'>
          <div className='grid w-full gap-1'>
            <label htmlFor='city' className='text-lg font-semibold'>
              City
            </label>
            <select name='city' id='city' className='primaryInput'>
              <option value=''>Choose your city</option>
              <option value='dhaka'>Dhaka</option>
              <option value='chattogram'>Chattogram</option>
              <option value='sylhet'>Sylhet</option>
              <option value='khulna'>Khulna</option>
              <option value='barishal'>Barishal</option>
              <option value='rajshahi'>Rajshahi</option>
              <option value='mymensingh'>Mymensingh</option>
              <option value='rangpur'>Rangpur</option>
            </select>
          </div>
          <div className='grid w-full gap-1'>
            <label htmlFor='address' className='text-lg font-semibold'>
              Area
            </label>
            <input
              type='text'
              id='address'
              name='address'
              placeholder='Mirpur-10 / Azimpur / Dhanmondi'
              className='primaryInput'
            />
          </div>
        </div>
        {/* address in details */}
        <div className='grid w-full gap-1'>
          <label htmlFor='address' className='text-lg font-semibold'>
            Address
          </label>
          <textarea
            name='address'
            id='address'
            placeholder='House no, Road no, Village, Post office'
            rows={4}
            className='primaryInput'
          ></textarea>
        </div>
        <div>
          <input
            type='checkbox'
            name='isDefault'
            id='isDefault'
            className='accent-green-600'
          />
          <label htmlFor='isDefault' className='ml-2 font-medium'>
            Set as default address
          </label>
        </div>
        {/* buttons */}
        <div className='flex gap-5'>
          <button className='secondaryBtn w-full'>Add Billing Address</button>
          <button className='primaryBtn w-full'>Save</button>
        </div>
      </form>
    </>
  );
};

export default ShippingAddress;
