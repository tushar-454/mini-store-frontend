import axios from 'axios';
import toast from 'react-hot-toast';
import { CiEdit } from 'react-icons/ci';
import { FcDeleteDatabase } from 'react-icons/fc';
import useAdminAllProducts, {
  ProductItemType,
} from '../../Hook/useAdminAllProducts';
import Loading from '../shared/Loading';

const ProductsDashboard = () => {
  const {
    adminAllProducts,
    adminAllProductsError,
    adminAllProductsLoad,
    refetch,
  } = useAdminAllProducts();

  // product delete function
  const handleProductDelete = async (id: string) => {
    try {
      const rusure = window.confirm('Are you sure to delete the product.');
      if (!rusure) return;
      const res = await axios.delete(
        `${import.meta.env.VITE_baseurl}/admin/product/${id}`,
      );
      if (res.data.status === 200) {
        toast.success('Product delete successfully');
        refetch();
      }
    } catch (error) {
      toast.error('There was an error while deleting.');
      console.log(error);
    }
  };

  return (
    <div className='w-full overflow-x-auto'>
      <div className='mb-5 flex items-center justify-between'>
        <p className='text-3xl font-bold'>Products</p>
        <button className='primaryBtn'>Add Product</button>
      </div>
      <table className='w-full overflow-x-auto'>
        <thead>
          <tr className='bg-neutral-100'>
            <th className='whitespace-nowrap border border-gray-300 p-2 text-left'>
              No
            </th>
            <th className='whitespace-nowrap border border-gray-300 p-2 text-left'>
              ID
            </th>
            <th className='whitespace-nowrap border border-gray-300 p-2 text-left'>
              Name
            </th>
            <th className='whitespace-nowrap border border-gray-300 p-2 text-left'>
              Category
            </th>
            <th className='whitespace-nowrap border border-gray-300 p-2 text-left'>
              Stock
            </th>
            <th className='whitespace-nowrap border border-gray-300 p-2 text-left'>
              Price
            </th>
            <th className='whitespace-nowrap border border-gray-300 p-2 text-left'>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {adminAllProductsError && (
            <tr>
              <td colSpan={4}>There was an error</td>
            </tr>
          )}
          {adminAllProductsLoad && <Loading />}
          {!adminAllProductsError &&
            !adminAllProductsLoad &&
            adminAllProducts?.data.length > 0 &&
            adminAllProducts?.data.map(
              (product: ProductItemType, index: number) => (
                <tr
                  key={Math.random()}
                  className={index % 2 === 0 ? '' : 'bg-neutral-50'}
                >
                  <td className='whitespace-nowrap border border-gray-300 p-2'>
                    {++index}
                  </td>
                  <td className='whitespace-nowrap border border-gray-300 p-2'>
                    {product._id}
                  </td>
                  <td className='whitespace-nowrap border border-gray-300 p-2'>
                    {product.name}
                  </td>
                  <td className='whitespace-nowrap border border-gray-300 p-2'>
                    {product.category}
                  </td>
                  <td className='whitespace-nowrap border border-gray-300 p-2'>
                    {product.isStock ? (
                      <span>Stock</span>
                    ) : (
                      <span className='text-red-500'>Stock Out</span>
                    )}
                  </td>
                  <td className='whitespace-nowrap border border-gray-300 p-2'>
                    {product.price}
                  </td>
                  <td className='whitespace-nowrap border border-gray-300 p-2'>
                    <span className='flex gap-5'>
                      <FcDeleteDatabase
                        onClick={() => handleProductDelete(product._id)}
                        className='cursor-pointer text-3xl'
                      />
                      <CiEdit className='cursor-pointer text-3xl' />
                    </span>
                  </td>
                </tr>
              ),
            )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsDashboard;
