import toast from 'react-hot-toast';
import useAdminAllOrders, {
  OrderItemType,
  OrderType,
} from '../../Hook/useAdminAllOrders';
import axios from '../../utils/axios';
import Loading from '../shared/Loading';

const OrdersDashboard = () => {
  const { adminAllOrders, adminAllOrdersLoad, adminAllOrdersError, refetch } =
    useAdminAllOrders();
  // handle user delete
  const handleOrderUpdate = async (id: string, status: string) => {
    try {
      const res = await axios.patch(`/admin/order/${id}`, {
        status: status.toLowerCase(),
      });
      if (res.status === 200) {
        toast.success('Status update successfully');
        refetch();
      } else {
        toast.error('Status not updated');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='w-full overflow-x-auto'>
      <div className='mb-5'>
        <p className='text-3xl font-bold'>Orders</p>
      </div>
      <table className='w-full overflow-x-auto'>
        <thead>
          <tr className='bg-neutral-100'>
            <th className='whitespace-nowrap border border-gray-300 p-2 text-left'>
              Order Time
            </th>
            <th className='whitespace-nowrap border border-gray-300 p-2 text-left'>
              Order ID
            </th>
            <th className='whitespace-nowrap border border-gray-300 p-2 text-left'>
              Name
            </th>
            <th className='whitespace-nowrap border border-gray-300 p-2 text-left'>
              Phone
            </th>
            <th className='whitespace-nowrap border border-gray-300 p-2 text-left'>
              City
            </th>
            <th className='whitespace-nowrap border border-gray-300 p-2 text-left'>
              Area
            </th>
            <th className='whitespace-nowrap border border-gray-300 p-2 text-left'>
              Address
            </th>
            <th className='whitespace-nowrap border border-gray-300 p-2 text-left'>
              Products
            </th>{' '}
            <th className='whitespace-nowrap border border-gray-300 p-2 text-left'>
              Total Price
            </th>
            <th className='whitespace-nowrap border border-gray-300 p-2 text-left'>
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {adminAllOrdersError && (
            <tr>
              <td colSpan={4}>There was an error</td>
            </tr>
          )}
          {adminAllOrdersLoad && <Loading />}
          {!adminAllOrdersError &&
            !adminAllOrdersLoad &&
            adminAllOrders?.data?.length > 0 &&
            adminAllOrders?.data.map((order: OrderType, index: number) => (
              <tr
                key={Math.random()}
                className={`${index % 2 === 0 ? '' : 'bg-neutral-50'} ${order.status === 'completed' ? 'bg-green-100' : order.status === 'cancelled' ? 'bg-red-100' : order.status === 'confirm' ? 'bg-orange-100' : ''}`}
              >
                <td className='whitespace-nowrap border border-gray-300 p-2'>
                  {new Date(order.orderDate).toLocaleString()}
                </td>
                <td className='whitespace-nowrap border border-gray-300 p-2'>
                  {order._id}
                </td>
                <td className='whitespace-nowrap border border-gray-300 p-2'>
                  {order?.userId.name}
                </td>
                <td className='whitespace-nowrap border border-gray-300 p-2'>
                  <a href={`tel:${order?.userId.phone}`}>
                    {order?.userId.phone}
                  </a>
                </td>
                <td className='whitespace-nowrap border border-gray-300 p-2'>
                  {order?.userId.city}
                </td>
                <td className='whitespace-nowrap border border-gray-300 p-2'>
                  {order?.userId.area}
                </td>
                <td className='whitespace-nowrap border border-gray-300 p-2'>
                  {order?.userId.address}
                </td>

                <td className='whitespace-nowrap border border-gray-300 p-2'>
                  <span className='flex flex-col'>
                    {order.orderItem.map((item: OrderItemType) => (
                      <span key={Math.random()}>
                        {item.name} - {item.quentity} - {item.size} -{' '}
                        {item.color}
                      </span>
                    ))}
                  </span>
                </td>
                <td className='whitespace-nowrap border border-gray-300 p-2'>
                  {order.price}
                </td>
                <td className='whitespace-nowrap border border-gray-300 p-2'>
                  <select
                    name='orderAdminAction'
                    id='orderAdminAction'
                    className='primaryInput w-32'
                    defaultValue={order.status}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      handleOrderUpdate(order._id, e.target.value)
                    }
                  >
                    <option value='pending'>Pending</option>
                    <option value='confirm'>Confirm</option>
                    <option value='completed'>Completed</option>
                    <option value='cancelled'>Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersDashboard;
