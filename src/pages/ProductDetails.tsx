export type CartItemType = {
  _id: number;
  randomId: number;
  image: string;
  name: string;
  isStock: boolean;
  price: number;
  quentity: number;
  size: string;
  color: string;
};

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import {
  FaFacebook,
  FaFacebookMessenger,
  FaHeart,
  FaInstagram,
  FaTwitter,
} from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import ProductCard, {
  ProductCardType,
} from '../components/Product/ProductCard';
import Breadcrumb from '../components/shared/Breadcrumb';
import Container from '../components/shared/Container';
import Title from '../components/shared/Title';
import useAllProducts from '../Hook/useAllProducts';
import useAuth from '../Hook/useAuth';
import useProduct from '../Hook/useProduct';
import { getLocalStorage, setCartLocalStorage } from '../utils/localStorage';

const ProductDetails = () => {
  const [quentity, setQuentity] = useState(0);
  const [size, setSize] = useState('S');
  const [color, setColor] = useState('Blue');
  const [selectedImage, setSelectedImage] = useState(0);
  const { id } = useParams();
  const { product, productLoad, productError } = useProduct(id);
  const { allProducts, allProductsLoad, allProductsError } = useAllProducts(
    'name,price,discount,image',
  );
  const { setCarts } = useAuth();

  const selectSize = (idx: number, size: string) => {
    const sizes = document.querySelectorAll('.product-size');
    sizes.forEach((size) => size.classList.remove('bg-neutral-300'));
    sizes[idx].classList.add('bg-neutral-300');
    setSize(size);
  };
  const selectColor = (idx: number, color: string) => {
    const colors = document.querySelectorAll('.product-color');
    colors.forEach((size) => size.classList.remove('border-neutral-900'));
    colors[idx].classList.add('border-neutral-900');
    setColor(color);
  };

  // add to cart function
  const addToCart = () => {
    if (quentity === 0) {
      return toast.error('Please set your product quentity');
    }
    const cartItem: CartItemType = {
      _id: product._id,
      randomId: Math.floor(Math.random() * 9999999999),
      image: product.image.main,
      name: product.name,
      isStock: product.isStock,
      price:
        Math.floor(product.price - (product.price * product.discount) / 100) *
        quentity,
      quentity,
      size,
      color,
    };
    setCartLocalStorage('carts', cartItem);
    const storeCart = getLocalStorage('carts');
    setCarts(storeCart);
  };

  useEffect(() => {
    scrollTo(0, 0);
  }, []);
  return (
    <section>
      <Container>
        {/* product breadcrumb */}
        <div className='my-10'>
          <Breadcrumb
            breadcrumbArr={[
              { name: 'Home', link: '/' },
              { name: 'Products', link: '/product/filter' },
              { name: `${product?.category}`, link: '/product/filter' },
              { name: 'Product Details', link: `/product/${id}` },
            ]}
          />
        </div>
        {/* product details wrapper  */}
        {productLoad && <p>Loading...</p>}
        {productError && <p>Something went wrong</p>}
        {!productLoad && !productError && (
          <div>
            {/* product main information */}
            <div className='flex flex-col justify-between gap-5 lg:flex-row'>
              {/* product simple image gallery and control */}
              <div className='w-full lg:w-1/2'>
                <div>
                  <img
                    src={
                      product.image.gallery[selectedImage] ?? product.image.main
                    }
                    alt={product.name}
                    className='h-[500px] w-full rounded-lg object-cover'
                  />
                </div>
                {/* product image conrols  */}
                <div className='my-5 flex flex-wrap justify-evenly gap-5'>
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  {product.image.gallery.map((link: any, index: number) => (
                    <img
                      src={link}
                      key={index}
                      alt=''
                      className={`size-10 cursor-pointer rounded-lg object-cover sm:size-20 ${index === selectedImage ? 'border-2 border-green-600' : ''}`}
                      onClick={() => setSelectedImage(index)}
                    />
                  ))}
                </div>
              </div>
              {/* product info */}
              <div className='flex w-full flex-col lg:w-1/2'>
                {/* title  */}
                <h1 className='text-2xl font-bold'>{product.name}</h1>
                {/* is stock  */}
                <div className='my-3 flex items-center justify-between'>
                  <span className='text-lg font-bold text-blue-600'>
                    {product.isStock ? 'In stock' : 'Stock Out'}
                  </span>
                  {/* share icon  */}
                  <span className='flex items-center justify-center'>
                    <span className='mr-5 text-lg font-bold'>Share</span>
                    <FaFacebook className='mr-4 text-2xl text-blue-600' />
                    <FaFacebookMessenger className='mr-4 text-2xl text-[#9a2bb1]' />
                    <FaInstagram className='mr-4 text-2xl text-orange-600' />
                    <FaTwitter className='mr-4 text-2xl text-blue-500' />
                  </span>
                </div>
                {/* Wishlist  */}
                <div className='flex items-center gap-2 text-lg'>
                  <FaHeart className='text-red-500' />
                  Wishlist
                </div>
                {/* price  */}
                <div className='my-3 text-3xl font-bold'>
                  <span>
                    BDT -{' '}
                    {Math.floor(
                      product.price - (product.price * product.discount) / 100,
                    )}
                  </span>
                  <small className='ml-2 text-sm font-medium'>
                    <del>BDT - {product.price}</del>
                  </small>
                </div>
                {/* size and color  */}
                <div className='my-5 flex flex-col justify-between gap-5 xl:flex-row'>
                  <div className='flex items-center gap-3'>
                    <span className='text-xl font-medium'>Size</span>
                    <span>|</span>
                    <ul className='ml-5 flex items-center gap-8'>
                      <li
                        onClick={() => selectSize(0, 'S')}
                        className='product-size bg-neutral-300'
                      >
                        S
                      </li>
                      <li
                        onClick={() => selectSize(1, 'M')}
                        className='product-size'
                      >
                        M
                      </li>
                      <li
                        onClick={() => selectSize(2, 'L')}
                        className='product-size'
                      >
                        L
                      </li>
                      <li
                        onClick={() => selectSize(3, 'XL')}
                        className='product-size'
                      >
                        XL
                      </li>
                    </ul>
                  </div>
                  <div className='flex items-center gap-3'>
                    <span className='text-xl font-medium'>Color</span>
                    <span>|</span>
                    <ul className='flex items-center gap-4'>
                      <li
                        onClick={() => selectColor(0, 'Blue')}
                        className='product-color border-neutral-900 bg-blue-700'
                      ></li>
                      <li
                        onClick={() => selectColor(1, 'Green')}
                        className='product-color bg-green-700'
                      ></li>
                      <li
                        onClick={() => selectColor(2, 'Pink')}
                        className='product-color bg-pink-700'
                      ></li>
                      <li
                        onClick={() => selectColor(3, 'Yellow')}
                        className='product-color bg-yellow-600'
                      ></li>
                    </ul>
                  </div>
                </div>
                {/* discription */}
                <div className='my-10'>
                  <p>{product.description}</p>
                </div>
                {/* product quantity &  add to cart with Order now button */}
                <div className='flex h-full flex-col justify-end space-y-4 pb-4'>
                  <div className='flex flex-col gap-5 sm:flex-row'>
                    <div className='flex w-full items-center justify-between rounded-lg border sm:w-1/5'>
                      <button
                        onClick={() => {
                          if (quentity === 0) return;
                          setQuentity(quentity - 1);
                        }}
                        className='px-4 py-2 text-xl font-bold transition-all hover:bg-neutral-200'
                      >
                        -
                      </button>
                      <span>{quentity}</span>
                      <button
                        onClick={() => setQuentity(quentity + 1)}
                        className='px-4 py-2 text-xl font-bold transition-all hover:bg-neutral-200'
                      >
                        +
                      </button>
                    </div>
                    <div className='w-full sm:w-4/5'>
                      <button
                        onClick={addToCart}
                        className='block h-full w-full rounded-lg bg-green-600 px-4 py-2 font-medium text-white transition-all hover:bg-green-700'
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                  <div className='w-full'>
                    <button className='block h-full w-full rounded-lg border border-green-600 bg-white px-4 py-2 font-medium text-green-600 transition-all hover:bg-green-100'>
                      Order Now
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* product main details everything  */}
            <div className='my-20'>
              <div className='border-b-2 pb-2'>
                <Title>
                  Product <span className='text-green-600'>Details</span>
                </Title>
              </div>
              {/* product details  */}
              <div className='grid gap-10 pt-10 sm:grid-cols-2 md:grid-cols-3'>
                <div>
                  <p className='mb-4 text-lg font-semibold'>About Products</p>
                  <ul className='space-y-2'>
                    <li>
                      <b>Product Name</b>: {product.productDetails.productName}
                    </li>
                    <li>
                      <b>Color:</b> {product.productDetails.color.toString()}
                    </li>
                    <li>
                      <b>Size:</b> {product.productDetails.size.toString()}
                    </li>
                    <li>
                      <b>Brand:</b> {product.productDetails.brand}
                    </li>
                  </ul>
                </div>
                {/* product material  */}
                <div>
                  <p className='mb-4 text-lg font-semibold'>Product Warrenty</p>
                  <ul className='space-y-2'>
                    <li>7 Days Replacement Warrenty</li>
                    <li>15 Days service Warrenty</li>
                    <li>3 days money back Warrenty</li>
                  </ul>
                </div>
                {/* product warrenty  */}
                <div>
                  <p className='mb-4 text-lg font-semibold'>Return Policy</p>
                  <ul className='space-y-2'>
                    <li>Product can't burn</li>
                    <li>Product can't any intention damage</li>
                    <li>
                      Product damage for water, it not applicable for Return
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* related products */}
            <div>
              <div className='border-b-2 pb-2'>
                <Title>
                  <span className='text-green-600'>Relative</span> Product
                </Title>
              </div>
              {/* related products  */}
              {allProductsLoad && <p>Loading...</p>}
              {allProductsError && <p>Something went wrong</p>}
              {!allProductsLoad && !allProductsError && (
                <div className='grid grid-cols-1 justify-between gap-5 py-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                  {allProducts.data
                    .slice(0, 4)
                    .map((product: ProductCardType) => (
                      <ProductCard key={Math.random()} product={product} />
                    ))}
                </div>
              )}
            </div>
          </div>
        )}
      </Container>
    </section>
  );
};

export default ProductDetails;
