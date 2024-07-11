import Container from '../components/shared/Container';
import Title from '../components/shared/Title';

const Cart = () => {
  return (
    <section>
      <Container>
        {/* wrapper  */}
        <div className='pt-5'>
          <Title>
            Shopping <span className='text-green-600'>Cart</span>
          </Title>
        </div>
        {/* cart table and details  */}
        <div className='flex flex-col gap-5 py-10 lg:flex-row'>
          {/* cart table */}
          <div className='w-full overflow-x-auto'>
            <table className='w-full'>
              <tr className='h-16 font-bold'>
                <td className='min-w-[490px] border p-2 text-lg lg:w-full'>
                  Product
                </td>
                <td className='min-w-32 border p-2 text-lg'>Quantity</td>
                <td className='min-w-32 border p-2 text-lg'>Price</td>
              </tr>
              {[{}, {}, {}, {}].map((_, index) => (
                <tr key={index}>
                  <td className='border p-2'>
                    <div className='flex items-center gap-5'>
                      <img
                        src='https://i.pinimg.com/originals/2a/ca/ab/2acaab5c280a40f576533b6f3729b691.jpg'
                        alt=''
                        className='h-20 w-20 rounded-lg object-cover'
                      />
                      <div>
                        <p className='text-lg font-medium'>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Corporis, ab.
                        </p>
                        <p className='text-green-500'>In Stock</p>
                        <div className='flex gap-5'>
                          <p>
                            <b>Size:</b> M
                          </p>
                          <p>
                            <b>Color:</b> Yellow
                          </p>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className='border p-2'>
                    <p className='text-lg'>
                      <p className='flex w-fit items-center gap-2 rounded-lg border'>
                        <span className='cursor-pointer p-2 transition-all hover:bg-neutral-100'>
                          -
                        </span>
                        <span>10</span>
                        <span className='cursor-pointer p-2 transition-all hover:bg-neutral-100'>
                          +
                        </span>
                      </p>
                    </p>
                    <p className='cursor-pointer text-green-600 transition-all hover:text-red-600'>
                      Remove
                    </p>
                  </td>
                  <td className='border p-2 text-xl font-bold'>$500</td>
                </tr>
              ))}
            </table>
          </div>
          {/* cart price details */}
          <div className='w-full lg:w-1/3'>
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
              <li className='flex items-center gap-3'>
                <input
                  type='text'
                  id='coupon'
                  name='coupon'
                  placeholder='Enter Coupon Code'
                  className='rounded-lg border p-2 text-lg outline-none'
                />
                <span>Apply</span>
              </li>
            </ul>
            {/* total  */}
            <ul className='border-t py-2'>
              <li className='flex items-center justify-between'>
                <span>Total</span>
                <span>300</span>
              </li>
            </ul>
            <button className='primaryBtn my-5'>Process to Checkout</button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Cart;
