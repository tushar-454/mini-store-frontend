interface ProductsDashboardEditFormProp {
  setShowUpdateForm: React.Dispatch<React.SetStateAction<boolean>>;
  product: ProductItemType;
  setProduct: React.Dispatch<React.SetStateAction<ProductItemType>>;
  refetch: () => Promise<QueryObserverResult<ProductItemType>>;
}
import { QueryObserverResult } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';
import { RxCross2 } from 'react-icons/rx';
import { ProductItemType } from '../../Hook/useAdminAllProducts';

const ProductsDashboardEditForm: React.FC<ProductsDashboardEditFormProp> = ({
  setShowUpdateForm,
  product,
  setProduct,
  refetch,
}) => {
  const productEditFormHandleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setProduct({ ...product, [name]: value });
    if (type === 'checkbox') {
      setProduct({ ...product, isStock: checked });
      return;
    }
    if (name === 'type') {
      setProduct({ ...product, type: value.split(',') });
      return;
    }
    if (name === 'brand') {
      setProduct({
        ...product,
        productDetails: { ...product?.productDetails, brand: value },
      });
      return;
    }
    if (name === 'name') {
      setProduct({
        ...product,
        name: value,
        productDetails: { ...product?.productDetails, productName: value },
      });
      return;
    }
    if (name === 'image') {
      setProduct({ ...product, image: value.split(',') });
      return;
    }
    if (name === 'color') {
      setProduct({
        ...product,
        productDetails: {
          ...product?.productDetails,
          color: value.split(','),
        },
      });
      return;
    }
    if (name === 'size') {
      setProduct({
        ...product,
        productDetails: {
          ...product?.productDetails,
          size: value.split(','),
        },
      });
      return;
    }
  };

  const handleProductUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_baseurl}/admin/product/${product?._id}`,
        product,
      );
      if (res.status === 200) {
        if (setShowUpdateForm) setShowUpdateForm(false);
        toast.success('Product updated successfully');
        if (refetch) refetch();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='fixed left-1/2 top-1/2 z-[9999] h-full w-full -translate-x-1/2 -translate-y-1/2 overflow-y-auto bg-[#00000099] backdrop-blur-lg'>
      <div data-aos='zoom in' className='grid w-full place-content-center'>
        <form
          onSubmit={handleProductUpdateSubmit}
          className='w-full space-y-6 rounded-lg bg-white p-5 md:w-[768px]'
        >
          <div className='flex items-center justify-between'>
            <h1 className='my-5 text-3xl font-bold'>Update your product</h1>
            <RxCross2
              onClick={() => {
                if (setShowUpdateForm) setShowUpdateForm(false);
              }}
              className='cursor-pointer rounded-full bg-green-500 p-1 text-3xl text-white'
            />
          </div>
          <div>
            <label htmlFor='name' className='mb-2 block text-lg font-semibold'>
              Name
            </label>
            <input
              type='text'
              name='name'
              id='name'
              className='primaryInput'
              value={product?.name}
              onChange={productEditFormHandleChange}
            />
          </div>
          <div>
            <label
              htmlFor='category'
              className='mb-2 block text-lg font-semibold'
            >
              Category
            </label>
            <input
              type='text'
              name='category'
              id='category'
              className='primaryInput'
              value={product?.category}
              onChange={productEditFormHandleChange}
            />
          </div>
          <div className='space-x-3'>
            <input
              type='checkbox'
              name='stock'
              id='stock'
              className='text-white accent-green-600'
              checked={product?.isStock}
              onChange={productEditFormHandleChange}
            />
            <label htmlFor='stock'>Product Stock</label>
          </div>
          <div className='flex justify-between gap-5'>
            <div className='w-full'>
              <label
                htmlFor='price'
                className='mb-2 block text-lg font-semibold'
              >
                Price
              </label>
              <input
                type='number'
                name='price'
                id='price'
                className='primaryInput'
                value={product?.price}
                onChange={productEditFormHandleChange}
              />
            </div>
            <div className='w-full'>
              <label
                htmlFor='discount'
                className='mb-2 block text-lg font-semibold'
              >
                Discount
              </label>
              <input
                type='number'
                name='discount'
                id='discount'
                className='primaryInput'
                value={product?.discount}
                onChange={productEditFormHandleChange}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor='description'
              className='mb-2 block text-lg font-semibold'
            >
              Description
            </label>
            <textarea
              name='description'
              id='description'
              className='primaryInput'
              rows={5}
              value={product?.description}
              onChange={productEditFormHandleChange}
            ></textarea>
          </div>
          <div>
            <label htmlFor='image' className='mb-2 block text-lg font-semibold'>
              Images
            </label>
            <textarea
              name='image'
              id='image'
              className='primaryInput'
              value={product?.image}
              onChange={productEditFormHandleChange}
            ></textarea>
          </div>
          <div>
            <label htmlFor='type' className='mb-2 block text-lg font-semibold'>
              Types
            </label>
            <input
              type='text'
              name='type'
              id='type'
              className='primaryInput'
              value={product?.type}
              onChange={productEditFormHandleChange}
            />
          </div>
          <div className='flex justify-between gap-5'>
            <div className='w-full'>
              <label
                htmlFor='color'
                className='mb-2 block text-lg font-semibold'
              >
                Colors
              </label>
              <input
                type='text'
                name='color'
                id='color'
                className='primaryInput'
                value={product?.productDetails.color}
                onChange={productEditFormHandleChange}
              />
            </div>
            <div className='w-full'>
              <label
                htmlFor='size'
                className='mb-2 block text-lg font-semibold'
              >
                Sizes
              </label>
              <input
                type='text'
                name='size'
                id='size'
                className='primaryInput'
                value={product?.productDetails.size}
                onChange={productEditFormHandleChange}
              />
            </div>
            <div className='w-full'>
              <label
                htmlFor='brand'
                className='mb-2 block text-lg font-semibold'
              >
                Brand
              </label>
              <input
                type='text'
                name='brand'
                id='brand'
                className='primaryInput'
                value={product?.productDetails.brand}
                onChange={productEditFormHandleChange}
              />
            </div>
          </div>
          <button className='primaryBtn block w-full'>Update Product</button>
        </form>
      </div>
    </div>
  );
};

export default ProductsDashboardEditForm;
