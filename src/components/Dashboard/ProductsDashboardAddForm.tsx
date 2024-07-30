interface ProductsDashboardEditFormProp {
  setShowAddForm: React.Dispatch<React.SetStateAction<boolean>>;
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
  setShowAddForm,
  product,
  setProduct,
  refetch,
}) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, checked } = e.target as HTMLInputElement;
    setProduct({ ...product, [name]: value });
    if (name === 'name') {
      setProduct({
        ...product,
        name: value,
        productDetails: { ...product.productDetails, productName: value },
      });
    }
    if (name === 'stock') {
      setProduct({ ...product, isStock: checked });
    }
    if (name === 'image') {
      setProduct({ ...product, image: value.split(',') });
    }
    if (name === 'type') {
      setProduct({ ...product, type: value.split(',') });
    }
    if (name === 'color') {
      setProduct({
        ...product,
        productDetails: { ...product.productDetails, color: value.split(',') },
      });
    }
    if (name === 'size') {
      setProduct({
        ...product,
        productDetails: { ...product.productDetails, size: value.split(',') },
      });
    }
    if (name === 'brand') {
      setProduct({
        ...product,
        productDetails: { ...product.productDetails, brand: value },
      });
    }
  };

  const handleAddProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const {
      name,
      category,
      description,
      discount,
      image,
      isStock,
      price,
      productDetails,
      type,
    } = product;
    try {
      if (
        !name ||
        !category ||
        !description ||
        !discount ||
        !image ||
        !isStock ||
        !price ||
        !productDetails ||
        !type
      ) {
        toast.error('Please fill all the fields');
        return;
      }
      const newProduct = {
        name,
        category,
        description,
        discount,
        image,
        isStock,
        price,
        productDetails,
        type,
      };
      const res = await axios.post(
        `${import.meta.env.VITE_baseurl}/admin/products`,
        newProduct,
      );
      if (res.data.status === 201) {
        toast.success('Product added successfully');
        setShowAddForm(false);
        refetch();
      }
    } catch (error) {
      toast.error('There was an error while adding the product');
    }
  };

  return (
    <div className='fixed left-1/2 top-1/2 z-[9999] h-full w-full -translate-x-1/2 -translate-y-1/2 overflow-y-auto bg-[#00000099] backdrop-blur-lg'>
      <div data-aos='zoom in' className='grid w-full place-content-center'>
        <form
          onSubmit={handleAddProduct}
          className='w-full space-y-6 rounded-lg bg-white p-5 md:w-[768px]'
        >
          <div className='flex items-center justify-between'>
            <h1 className='my-5 text-3xl font-bold'>Add your product</h1>
            <RxCross2
              onClick={() => {
                if (setShowAddForm) setShowAddForm(false);
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
              placeholder='Product name'
              className='primaryInput'
              value={product?.name}
              onChange={handleChange}
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
              placeholder='Product category'
              className='primaryInput'
              value={product?.category}
              onChange={handleChange}
            />
          </div>
          <div className='space-x-3'>
            <input
              type='checkbox'
              name='stock'
              id='stock'
              className='text-white accent-green-600'
              checked={product?.isStock}
              onChange={handleChange}
            />
            <label htmlFor='stock'>Product Stock</label>
          </div>
          <div className='flex flex-col justify-between gap-5 sm:flex-row'>
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
                placeholder='Product price'
                className='primaryInput'
                value={product?.price}
                onChange={handleChange}
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
                placeholder='Product discount'
                className='primaryInput'
                value={product?.discount}
                onChange={handleChange}
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
              placeholder='Product description'
              className='primaryInput'
              rows={5}
              value={product?.description}
              onChange={handleChange}
            ></textarea>
          </div>
          <div>
            <label htmlFor='image' className='mb-2 block text-lg font-semibold'>
              Images
            </label>
            <textarea
              name='image'
              id='image'
              placeholder='Product images links'
              className='primaryInput'
              value={product?.image}
              onChange={handleChange}
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
              placeholder='Product types Ex. Mobile, Electronics'
              className='primaryInput'
              value={product?.type}
              onChange={handleChange}
            />
          </div>
          <div className='flex flex-col justify-between gap-5 sm:flex-row'>
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
                placeholder='Product colors Ex. Red, Blue'
                className='primaryInput'
                value={product?.productDetails.color}
                onChange={handleChange}
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
                placeholder='Product sizes Ex. S, M, L'
                className='primaryInput'
                value={product?.productDetails.size}
                onChange={handleChange}
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
                placeholder='Product brand'
                className='primaryInput'
                value={product?.productDetails.brand}
                onChange={handleChange}
              />
            </div>
          </div>
          <button className='primaryBtn block w-full'>Add Product</button>
        </form>
      </div>
    </div>
  );
};

export default ProductsDashboardEditForm;
