import { useState } from 'react';
import {
  FaFacebook,
  FaFacebookMessenger,
  FaHeart,
  FaInstagram,
  FaTwitter,
} from 'react-icons/fa';
import Breadcrumb from '../components/shared/Breadcrumb';
import Container from '../components/shared/Container';
import Title from '../components/shared/Title';

const gallaryImage = [
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_NCyKIAYqVqGTsK8evlXNRVTEH66HEGhmfabvhCZ_EgqF56nuh0P1JFZ8B9okMzoJZ9c&usqp=CAU',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOuxrI6k_aK5ELLcQLEMTPq3hytPFgwGYmC2iKmnbUrgPuWbKidMxS4DI094-kPd4AQSA&usqp=CAU',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLqMnQxhMP-RjddKdt6XV8Do__v62IfWb5G3wenX0Rc0nTne-irNd6qirI-KRfV5vyEp8&usqp=CAU',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv509oRz8BluM9kGMFJM-79QuszTsFPlDSrIBLvBbBmCSJmC273jpEnegogAkEo-8Fx3s&usqp=CAU',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRHRzvb5SI9BsUdQzW6XA8HgyIvuw-tgyw23dk8Q0Qdk_LYJCBDsjvlcbBLJk6mDlc8OU&usqp=CAU',
];

const ProductDetails = () => {
  const [quentity, setQuentity] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  return (
    <section>
      <Container>
        {/* product breadcrumb */}
        <div className='my-10'>
          <Breadcrumb
            breadcrumbArr={[
              { name: 'Home', link: '/' },
              { name: 'Product', link: '/' },
              { name: 'Women Bag', link: '/' },
              { name: 'Product Details', link: '/product/1' },
            ]}
          />
        </div>
        {/* product details wrapper  */}
        <div>
          {/* product main information */}
          <div className='flex flex-col justify-between gap-5 lg:flex-row'>
            {/* product simple image gallery and control */}
            <div className='w-full lg:w-1/2'>
              <div>
                <img
                  src={gallaryImage[selectedImage]}
                  alt=''
                  className='h-[500px] w-full rounded-lg object-cover'
                />
              </div>
              {/* product image conrols  */}
              <div className='my-5 flex flex-wrap justify-evenly gap-5'>
                {gallaryImage.map((link, index) => (
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
              <h1 className='text-2xl font-bold'>Fossile Block - Ladis Bag</h1>
              {/* is stock  */}
              <div className='my-3 flex items-center justify-between'>
                <span className='text-lg font-bold text-blue-600'>
                  In stock
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
                <span>BDT - 25,000</span>
                <small className='ml-2 text-sm font-medium'>
                  <del>BDT - 35,000</del>
                </small>
              </div>
              {/* size and color  */}
              <div className='my-5 flex flex-col justify-between gap-5 xl:flex-row'>
                <div className='flex items-center gap-3'>
                  <span className='text-xl font-medium'>Size</span>
                  <span>|</span>
                  <ul className='ml-5 flex items-center gap-8'>
                    <li className='product-size bg-neutral-300'>S</li>
                    <li className='product-size'>M</li>
                    <li className='product-size'>L</li>
                    <li className='product-size'>XL</li>
                  </ul>
                </div>
                <div className='flex items-center gap-3'>
                  <span className='text-xl font-medium'>Color</span>
                  <span>|</span>
                  <ul className='flex items-center gap-4'>
                    <li className='size-8 cursor-pointer rounded-full border-2 border-transparent bg-blue-700'></li>
                    <li className='size-8 cursor-pointer rounded-full border-2 border-neutral-900 bg-green-700'></li>
                    <li className='size-8 cursor-pointer rounded-full border-2 border-transparent bg-pink-700'></li>
                    <li className='size-8 cursor-pointer rounded-full border-2 border-transparent bg-yellow-600'></li>
                  </ul>
                </div>
              </div>
              {/* EMI or full payment */}
              <div className='my-10'>
                <div>
                  <input
                    type='radio'
                    name='payment'
                    id='emi'
                    className='mr-2 accent-green-700'
                  />
                  <label htmlFor='emi'>EMI</label>
                </div>
                <div>
                  <input
                    type='radio'
                    name='payment'
                    id='full'
                    className='mr-2 accent-green-700'
                  />
                  <label htmlFor='full'>Full Payment</label>
                </div>
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
                    <button className='block h-full w-full rounded-lg bg-green-600 px-4 py-2 font-medium text-white transition-all hover:bg-green-700'>
                      Pre Order
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
            <Title>
              Product <span className='text-green-600'>Details</span>
            </Title>
          </div>
          {/* related products */}
          <div></div>
        </div>
      </Container>
    </section>
  );
};

export default ProductDetails;
