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

import toast from 'react-hot-toast';
import useOrdersUsers from '../../Hook/useOrdersUsers';
import axios from '../../utils/axios';
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
      await axios.patch(`/users/order/cancel/${order._id}`, {
        status: e.target.value,
      });
      if (e.target.value === 'cancelled') {
        toast.success('Order Cancelled');
        refetchUserOrders();
      }
      if (e.target.value === 'pending') {
        toast.success('Order Retrived');
        refetchUserOrders();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='w-full overflow-x-auto'>
      <table className='w-full overflow-x-auto'>
        <thead>
          <tr className='bg-neutral-100'>
            <th className='border border-gray-300 p-2 text-left'>
              Product Info
            </th>
            <th className='whitespace-nowrap border border-gray-300 p-2 text-left'>
              Order ID
            </th>
            <th className='whitespace-nowrap border border-gray-300 p-2 text-left'>
              Price
            </th>
            <th className='whitespace-nowrap border border-gray-300 p-2 text-left'>
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {errorUserOrders && (
            <tr>
              <td colSpan={4}>There was an error</td>
            </tr>
          )}
          {loadUserOrders && <Loading />}
          {!loadUserOrders && !errorUserOrders && userOrders && (
            <>
              {userOrders?.data?.map((order: Order) => (
                <tr
                  key={order._id}
                  className={`${order.status === 'pending' ? '' : order.status === 'cancelled' ? 'bg-red-50' : order.status === 'confirm' ? 'bg-orage-50' : order.status === 'completed' ? 'bg-green-50' : ''}`}
                >
                  <td className='min-w-[40rem] border border-gray-300 p-2 text-left'>
                    <span>
                      {order.orderItem.map((item: OrderItem) => (
                        <span
                          key={item._id}
                          className='mb-1 flex items-center gap-4'
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className='h-20 w-20 object-cover'
                          />
                          <span className='grid'>
                            <span>
                              <b>Name: </b>
                              {item.name}
                            </span>
                            <span>
                              <b>Quentity: </b> {item.quentity}
                            </span>
                            <span>
                              <b>Color: </b> {item.color}
                            </span>
                            <span>
                              <b>size: </b> {item.size}
                            </span>
                          </span>
                        </span>
                      ))}
                    </span>
                  </td>
                  <td className='whitespace-nowrap border border-gray-300 p-2 text-left'>
                    <span> {order._id}</span>
                  </td>
                  <td className='whitespace-nowrap border border-gray-300 p-2 text-left'>
                    {order.price}
                  </td>
                  <td className='whitespace-nowrap border border-gray-300 p-2 text-left'>
                    {order.status === 'completed' ||
                    order.status === 'confirm' ? (
                      <select
                        name='status'
                        id='status'
                        defaultValue={order.status}
                        className='primaryInput min-w-[8rem]'
                        disabled
                      >
                        <option value='confirm'>Confirm</option>
                        <option value='completed'>Completed</option>
                      </select>
                    ) : (
                      <select
                        name='status'
                        id='status'
                        defaultValue={order.status}
                        className='primaryInput min-w-[8rem]'
                        onChange={(e) => handleStatusChange(e, order)}
                      >
                        <option value='pending'>Pending</option>
                        <option value='cancelled'>Cancelled</option>
                      </select>
                    )}
                  </td>
                </tr>
              ))}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Order;
