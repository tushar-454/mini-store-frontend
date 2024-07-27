type OrderItem = {
  _id: string;
  randomId: number;
  image: string;
  name: string;
  isStock: boolean;
  price: number;
  quentity: number;
  size: string;
  color: string;
};

type Order = {
  _id: string;
  userId: string;
  price: number;
  orderItem: OrderItem[];
  status: 'pending' | 'confirm' | 'completed' | 'cancelled';
  orderDate: Date;
  createdAt: Date;
  updatedAt: Date;
};

import axios from 'axios';
import toast from 'react-hot-toast';
import useOrdersUsers from '../../Hook/useOrdersUsers';
import Loading from '../shared/Loading';

const Order = () => {
  const { userOrders, loadUserOrders, errorUserOrders, refetchUserOrders } =
    useOrdersUsers();

  const handleStatusChange = async (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
    order: Order,
  ) => {
    const { value } = e.target as
      | HTMLInputElement
      | HTMLSelectElement
      | HTMLTextAreaElement;
    if (value === '') return;

    try {
      const rusure = window.confirm(
        e.target.value === 'cancelled'
          ? 'Are you sure to cancel this order?'
          : 'Are you sure to retrived this order?',
      );
      if (!rusure) return;
      const res = await axios.patch(
        `${import.meta.env.VITE_baseurl}/users/order/cancel/${order._id}`,
        { status: e.target.value },
      );
      if (res?.data.status === 204) {
        toast.success('Order Cancelled');
        refetchUserOrders();
      }
      if (res?.data.status === 200) {
        toast.success('Order Retrived');
        refetchUserOrders();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='w-full overflow-x-auto'>
      {loadUserOrders && <Loading />}
      {errorUserOrders && <div>There was an Error</div>}
      {!loadUserOrders && !errorUserOrders && userOrders && (
        <div className='grid w-full gap-5'>
          {userOrders?.data.map((order: Order) => {
            return (
              <div
                key={Math.random()}
                className={`w-full border p-4 ${order.status === 'cancelled' && 'border-red-500 bg-red-50'} ${order.status === 'confirm' && 'border-yellow-500 bg-yellow-50'} ${order.status === 'completed' && 'border-green-500 bg-green-50'}`}
              >
                {order?.orderItem.map((item: OrderItem) => (
                  <div
                    key={Math.random()}
                    className='mb-2 flex items-center justify-between gap-5'
                  >
                    <img
                      src={item.image}
                      alt=''
                      className='h-20 w-20 whitespace-nowrap rounded-lg object-cover'
                    />
                    <div className='flex flex-col whitespace-nowrap'>
                      <span>
                        <b>Name:</b> {item.name}
                      </span>
                      <span>
                        <b>Random Id:</b> {item.randomId}
                      </span>
                      <span>
                        <b>Order Id:</b> {item._id}
                      </span>
                    </div>
                    <div className='flex flex-col whitespace-nowrap'>
                      <span>
                        <b>Color:</b> {item.color}
                      </span>
                      <span>
                        <b>Price:</b> {item.price}
                      </span>
                      <span>
                        <b>Quentity:</b> {item.quentity}
                      </span>
                    </div>
                    <div className='flex flex-col whitespace-nowrap'>
                      <span>
                        <b>Size:</b> {item.size}
                      </span>
                      <span>
                        <b>Stock:</b> {item.isStock ? 'Stock' : 'Out of Stock'}
                      </span>
                      <span>
                        <b>Status:</b> {order.status}
                      </span>
                    </div>
                    <div className='min-w-fit whitespace-nowrap'>
                      <select
                        name='status'
                        id='status'
                        defaultValue={order.status}
                        className='primaryInput whitespace-nowrap'
                        onChange={(e) => handleStatusChange(e, order)}
                        disabled={
                          order.status === 'confirm' ||
                          order.status === 'completed'
                        }
                      >
                        {order.status === 'pending' ||
                        order.status === 'cancelled' ? (
                          <>
                            <option value='pending'>Pending</option>
                            <option value='cancelled'>Cancelled</option>
                          </>
                        ) : (
                          <option value={order.status}>
                            {order.status.charAt(0).toUpperCase() +
                              order.status.slice(1)}
                          </option>
                        )}
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Order;
