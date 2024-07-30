import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { CiEdit } from 'react-icons/ci';
import { FcDeleteDatabase } from 'react-icons/fc';
import useAdminAllProducts, {
  ProductItemType,
} from '../../Hook/useAdminAllProducts';
import Loading from '../shared/Loading';
import ProductsDashboardAddForm from './ProductsDashboardAddForm';
import ProductsDashboardEditForm from './ProductsDashboardEditForm';

const productInit = {
  _id: '',
  name: '',
  category: '',
  isStock: false,
  price: 0,
  discount: 0,
  description: '',
  image: [],
  type: [],
  productDetails: {
    productName: '',
    color: [],
    size: [],
    brand: '',
  },
};

const ProductsDashboard = () => {
  const {
    adminAllProducts,
    adminAllProductsError,
    adminAllProductsLoad,
    refetch,
  } = useAdminAllProducts();
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [product, setProduct] = useState<ProductItemType>(productInit);
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

  // handle to go to the product update from
  const updateProductForm = async (id: string) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_baseurl}/admin/product/${id}`,
      );
      if (res.data.status === 200) {
        setProduct(res.data.data);
        setShowUpdateForm(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className='w-full overflow-x-auto'>
        <div className='mb-5 flex items-center justify-between'>
          <p className='text-3xl font-bold'>Products</p>
          <button onClick={() => setShowAddForm(true)} className='primaryBtn'>
            Add Product
          </button>
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

                        <CiEdit
                          onClick={() => updateProductForm(product._id)}
                          className='cursor-pointer text-3xl'
                        />
                      </span>
                    </td>
                  </tr>
                ),
              )}
          </tbody>
        </table>
      </div>
      {showUpdateForm && (
        <ProductsDashboardEditForm
          setShowUpdateForm={setShowUpdateForm}
          product={product}
          setProduct={setProduct}
          refetch={refetch}
        />
      )}
      {showAddForm && (
        <ProductsDashboardAddForm
          setShowAddForm={setShowAddForm}
          product={product}
          setProduct={setProduct}
          refetch={refetch}
        />
      )}
    </>
  );
};

export default ProductsDashboard;
