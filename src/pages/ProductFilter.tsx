import { useEffect, useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { GoSearch } from 'react-icons/go';
import { MdOutlineSensorWindow, MdOutlineWindow } from 'react-icons/md';
import { RxCross2 } from 'react-icons/rx';
import FeaturedProductCard from '../components/FeaturedProducts/FeaturedProductCard';
import { Carousel } from '../components/ProductFilter/Carousel';
import Breadcrumb from '../components/shared/Breadcrumb';
import Container from '../components/shared/Container';

const ProductFilter = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  useEffect(() => {
    document.title = 'Product Filter | E-commerce';
    scrollTo(0, 0);
  }, []);
  return (
    <section>
      {/* product filter slider */}
      <Carousel />
      {/* all product lists here with filter functionality  */}
      <Container>
        <div className='sticky -top-10 z-50 h-64 overflow-hidden bg-white'>
          {/* breadcrumb  */}
          <div className='mt-20'>
            <Breadcrumb
              breadcrumbArr={[
                { name: 'Products', link: '/' },
                { name: 'Women', link: '/' },
                { name: 'Bag', link: '/' },
              ]}
            />
          </div>
          {/* product catagory informaiton and search */}
          <div className='mt-5 flex items-center justify-between'>
            <div>
              <p className='text-xl font-medium'>Ladies Watches</p>
              <p>Lorem ipsum dolor sit amet.</p>
            </div>
            <form onSubmit={(e) => e.preventDefault()} className='flex'>
              <input
                type='text'
                placeholder='Search Product'
                className='primaryInput'
              />
              <button
                type='submit'
                className='-ml-2 grid w-12 place-items-center rounded-r-lg border border-green-600 bg-green-600 p-2 text-lg text-white outline-none'
              >
                <GoSearch />
              </button>
            </form>
          </div>
          {/* search preferences  */}
          <div className='mt-5 flex justify-between gap-4 xl:justify-end'>
            <div className='block xl:hidden'>
              {isFilterOpen ? (
                <RxCross2
                  className='mt-1 text-3xl text-neutral-700'
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                />
              ) : (
                <FaBars
                  className='mt-1 text-3xl text-neutral-700'
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                />
              )}
            </div>
            <div className='flex justify-between gap-4 md:justify-end'>
              <button className='text-whiter grid place-items-center rounded-lg border border-green-600 bg-green-600 px-4 py-2 font-medium text-white'>
                Best matches
              </button>
              <button className='search-preference-tab'>All</button>
              <button className='search-preference-tab'>Free Delivery</button>
              <button className='search-preference-tab flex items-center gap-2'>
                <span>View</span>
                <span>
                  <MdOutlineWindow />
                </span>
                <span>
                  <MdOutlineSensorWindow />
                </span>
              </button>
            </div>
          </div>
        </div>
        {/* all product lists here with filter options  */}
        <div className='relative my-5 flex justify-between gap-5'>
          {/* filter options  */}
          <div
            className={`absolute top-0 z-40 h-screen rounded-lg bg-neutral-100 p-4 px-6 transition-all xl:sticky xl:top-56 xl:h-fit ${isFilterOpen ? 'left-0' : '-left-72'}`}
          >
            <ul className='category-filter'>
              <p className='mb-2 text-lg font-medium'>Category</p>
              <li>
                <input
                  type='checkbox'
                  className='mr-2 accent-green-600'
                  name='men'
                  id='men'
                />
                <label className='font-medium' htmlFor='men'>
                  Men
                </label>
              </li>
              <li>
                <input
                  type='checkbox'
                  className='mr-2 accent-green-600'
                  name='women'
                  id='women'
                />
                <label className='font-medium' htmlFor='women'>
                  Women
                </label>
              </li>
              <li>
                <input
                  type='checkbox'
                  className='mr-2 accent-green-600'
                  name='children'
                  id='children'
                />
                <label className='font-medium' htmlFor='children'>
                  Children
                </label>
              </li>
              <li>
                <input
                  type='checkbox'
                  className='mr-2 accent-green-600'
                  name='travel'
                  id='travel'
                />
                <label className='font-medium' htmlFor='travel'>
                  Travel
                </label>
              </li>
              <li>
                <input
                  type='checkbox'
                  className='mr-2 accent-green-600'
                  name='electronic'
                  id='electronic'
                />
                <label className='font-medium' htmlFor='electronic'>
                  Electornics
                </label>
              </li>
            </ul>
            <ul className='color-filter mt-10'>
              <p className='mb-2 text-lg font-medium'>Color</p>
              <li>
                <input
                  type='checkbox'
                  className='mr-2 accent-green-600'
                  name='black'
                  id='black'
                />
                <label className='font-medium' htmlFor='black'>
                  Black
                </label>
              </li>
              <li>
                <input
                  type='checkbox'
                  className='mr-2 accent-green-600'
                  name='white'
                  id='white'
                />
                <label className='font-medium' htmlFor='white'>
                  White
                </label>
              </li>
              <li>
                <input
                  type='checkbox'
                  className='mr-2 accent-green-600'
                  name='pink'
                  id='pink'
                />
                <label className='font-medium' htmlFor='pink'>
                  Pink
                </label>
              </li>
              <li>
                <input
                  type='checkbox'
                  className='mr-2 accent-green-600'
                  name='blue'
                  id='blue'
                />
                <label className='font-medium' htmlFor='blue'>
                  Blue
                </label>
              </li>
              <li>
                <input
                  type='checkbox'
                  className='mr-2 accent-green-600'
                  name='cream'
                  id='cream'
                />
                <label className='font-medium' htmlFor='cream'>
                  Cream
                </label>
              </li>
            </ul>
            <ul className='size-filter mt-10'>
              <p className='mb-2 text-lg font-medium'>Color</p>
              <li>
                <input
                  type='checkbox'
                  className='mr-2 accent-green-600'
                  name='XS'
                  id='XS'
                />
                <label className='font-medium' htmlFor='XS'>
                  XS
                </label>
              </li>
              <li>
                <input
                  type='checkbox'
                  className='mr-2 accent-green-600'
                  name='S'
                  id='S'
                />
                <label className='font-medium' htmlFor='S'>
                  S
                </label>
              </li>
              <li>
                <input
                  type='checkbox'
                  className='mr-2 accent-green-600'
                  name='M'
                  id='M'
                />
                <label className='font-medium' htmlFor='M'>
                  M
                </label>
              </li>
              <li>
                <input
                  type='checkbox'
                  className='mr-2 accent-green-600'
                  name='L'
                  id='L'
                />
                <label className='font-medium' htmlFor='L'>
                  L
                </label>
              </li>
              <li>
                <input
                  type='checkbox'
                  className='mr-2 accent-green-600'
                  name='XL'
                  id='XL'
                />
                <label className='font-medium' htmlFor='XL'>
                  XL
                </label>
              </li>
              <li>
                <input
                  type='checkbox'
                  className='mr-2 accent-green-600'
                  name='XXL'
                  id='XXL'
                />
                <label className='font-medium' htmlFor='XXL'>
                  XXL
                </label>
              </li>
            </ul>
            {/* price range  */}
            <div className='my-10'>
              <p className='mb-2 text-lg font-medium'>Price Range</p>
              <div className='relative flex gap-4'>
                <div className='flex flex-col gap-1'>
                  <label
                    htmlFor='minPrice'
                    className='items-center font-medium'
                  >
                    Min
                  </label>
                  <input
                    type='number'
                    name='minPrice'
                    id='minPrice'
                    min={0}
                    placeholder='0'
                    className='grid w-20 place-items-center rounded-lg border border-green-600 bg-white px-2 py-1 text-lg font-medium text-green-600 outline-none'
                  />
                </div>
                <div className='mb-2 flex items-end'>--</div>
                <div className='flex flex-col gap-1'>
                  <label
                    htmlFor='maxPrice'
                    className='items-center font-medium'
                  >
                    Max
                  </label>
                  <input
                    type='number'
                    name='maxPrice'
                    id='maxPrice'
                    max={20000}
                    placeholder='20000'
                    className='grid w-20 place-items-center rounded-lg border border-green-600 bg-white px-2 py-1 text-lg font-medium text-green-600 outline-none'
                  />
                </div>
              </div>
            </div>
          </div>
          {/* all products  */}
          <div className='grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'>
            {Array(30)
              .fill({})
              .map((_, index) => (
                <FeaturedProductCard key={index} />
              ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ProductFilter;
