import { Link } from 'react-router-dom';
import Container from '../components/shared/Container';
import Title from '../components/shared/Title';
import { getLocalStorage } from '../utils/localStorage';
import { CartItemType } from './ProductDetails';

const Cart = () => {
  const cartsArr = getLocalStorage('carts') || [];
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
        {cartsArr.length === 0 && <p>No cart item yet</p>}
        {cartsArr.length > 0 && (
          <div className='flex flex-col gap-5 py-10 lg:flex-row'>
            {/* cart table */}
            <div className='w-full overflow-x-auto'>
              <table className='w-full'>
                <tr className='h-16 font-bold'>
                  <td className='min-w-[490px] p-2 text-lg lg:w-full'>
                    Product
                  </td>
                  <td className='min-w-32 p-2 text-lg'>Quantity</td>
                  <td className='min-w-32 p-2 text-lg'>Price</td>
                </tr>
                {cartsArr?.map((cart: CartItemType) => (
                  <tr key={Math.random()}>
                    <td className='p-2'>
                      <div className='flex items-center gap-5'>
                        <img
                          src={cart.image}
                          alt={cart.name}
                          className='h-20 w-20 rounded-lg object-cover'
                        />
                        <div>
                          <p className='text-lg font-medium'>{cart.name}</p>
                          <p className='text-green-500'>
                            {cart.isStock ? 'In Stock' : 'Stock Out'}
                          </p>
                          <div className='flex gap-5'>
                            <p>
                              <b>Size:</b> {cart.size}
                            </p>
                            <p>
                              <b>Color:</b> {cart.color}
                            </p>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className='p-2'>
                      <p className='text-lg'>
                        <p className='flex w-fit items-center gap-2 rounded-lg border'>
                          <span className='cursor-pointer p-2 transition-all hover:bg-neutral-100'>
                            -
                          </span>
                          <span>{cart.quentity}</span>
                          <span className='cursor-pointer p-2 transition-all hover:bg-neutral-100'>
                            +
                          </span>
                        </p>
                      </p>
                      <p className='cursor-pointer text-green-600 transition-all hover:text-red-600'>
                        Remove
                      </p>
                    </td>
                    <td className='p-2 text-xl font-bold'>${cart.price}</td>
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
                {cartsArr.map((cart: CartItemType, index: number) => (
                  <li
                    key={Math.random()}
                    className='flex items-center justify-between'
                  >
                    <span>
                      {++index}
                      {')'} {cart.name}
                    </span>
                    <span>{cart.price}</span>
                  </li>
                ))}
              </ul>
              {/* subtotal  */}
              <ul className='border-t py-2'>
                <li className='flex items-center justify-between'>
                  <span>Sub Total</span>
                  <span>
                    {cartsArr.reduce(
                      (acc: number, cur: CartItemType) => acc + cur.price,
                      0,
                    )}
                  </span>
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
                    className='rounded-lg border px-4 py-2 font-medium outline-none'
                  />
                  <span className='primaryBtn'>Apply</span>
                </li>
              </ul>
              {/* total  */}
              <ul className='border-t py-2'>
                <li className='flex items-center justify-between'>
                  <span>Total</span>
                  <span>
                    {cartsArr.reduce(
                      (acc: number, cur: CartItemType) => acc + cur.price,
                      0,
                    ) - 100}
                  </span>
                </li>
              </ul>
              <Link to={'/order'} className='primaryBtn my-5'>
                Process to Checkout
              </Link>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
};

export default Cart;
