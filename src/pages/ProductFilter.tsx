import { useEffect, useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { GoSearch } from 'react-icons/go';
import { MdOutlineSensorWindow, MdOutlineWindow } from 'react-icons/md';
import { RxCross2 } from 'react-icons/rx';
// import { Carousel } from '../components/ProductFilter/Carousel';
import Breadcrumb from '../components/shared/Breadcrumb';
import Container from '../components/shared/Container';
// import AllProducts from '../Data/AllProducts';
import useAllProducts from '../Hook/useAllProducts';
import ProductCard, {
  ProductCardType,
} from '../components/Product/ProductCard';

const ProductFilter = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [category, setCategory] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<{
    minPrice: number;
    maxPrice: number;
  }>({
    minPrice: 0,
    maxPrice: 9999999999,
  });
  const { allProducts, allProductsLoad, allProductsError, refetch } =
    useAllProducts(
      'name,category,price,discount,image',
      category.join(','),
      priceRange.minPrice,
      priceRange.maxPrice,
    );

  const handleFilterCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (category.includes(e.target.name)) {
      const newCategory = category.filter((cat) => cat !== e.target.name);
      setCategory(newCategory);
    } else {
      const newCategory = [...category, e.target.name];
      setCategory(newCategory);
    }
  };

  const handlePriceRange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPriceRange((prev) => ({ ...prev, [name]: parseFloat(value) }));
  };

  useEffect(() => {
    setTimeout(() => {
      refetch();
    }, 200);
  }, [category, refetch, priceRange]);

  useEffect(() => {
    document.title = 'Product Filter | E-commerce';
    scrollTo(0, 0);
  }, []);
  return (
    <section>
      {/* product filter slider */}
      {/* <Carousel /> */}
      {/* all product lists here with filter functionality  */}
      <Container>
        <div className='sticky top-[4rem] z-50 h-48 overflow-hidden bg-white py-4'>
          {/* breadcrumb  */}
          <div className=''>
            <Breadcrumb
              breadcrumbArr={[
                { name: 'Home', link: '/' },
                { name: 'All Products', link: '/product/filter' },
              ]}
            />
          </div>
          {/* product catagory informaiton and search */}
          <div className='mt-5 flex items-center justify-between'>
            <div>
              <p className='text-xl font-medium'>Our All Best Collections</p>
              <p> Here our all products with reasonable price </p>
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
            className={`absolute top-0 z-40 h-screen rounded-lg bg-neutral-100 p-4 px-6 transition-all xl:sticky xl:top-64 xl:h-fit ${isFilterOpen ? 'left-0' : '-left-72'}`}
          >
            <ul className='category-filter'>
              <p className='mb-2 text-lg font-medium'>Category</p>
              <li>
                <input
                  type='checkbox'
                  className='mr-2 accent-green-600'
                  name='shoe'
                  id='shoe'
                  onChange={handleFilterCategory}
                />
                <label className='font-medium' htmlFor='shoe'>
                  Shoes
                </label>
              </li>
              <li>
                <input
                  type='checkbox'
                  className='mr-2 accent-green-600'
                  name='bag'
                  id='bag'
                  onChange={handleFilterCategory}
                />
                <label className='font-medium' htmlFor='bag'>
                  Bags
                </label>
              </li>
              <li>
                <input
                  type='checkbox'
                  className='mr-2 accent-green-600'
                  name='men'
                  id='men'
                  onChange={handleFilterCategory}
                />
                <label className='font-medium' htmlFor='men'>
                  Men's
                </label>
              </li>
              <li>
                <input
                  type='checkbox'
                  className='mr-2 accent-green-600'
                  name='women'
                  id='women'
                  onChange={handleFilterCategory}
                />
                <label className='font-medium' htmlFor='women'>
                  Women's
                </label>
              </li>
              <li>
                <input
                  type='checkbox'
                  className='mr-2 accent-green-600'
                  name='watch'
                  id='watch'
                  onChange={handleFilterCategory}
                />
                <label className='font-medium' htmlFor='watch'>
                  Watches
                </label>
              </li>
              <li>
                <input
                  type='checkbox'
                  className='mr-2 accent-green-600'
                  name='jewelry'
                  id='jewelry'
                  onChange={handleFilterCategory}
                />
                <label className='font-medium' htmlFor='jewelry'>
                  Jewelry
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
                    value={priceRange.minPrice}
                    onChange={handlePriceRange}
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
                    value={priceRange.maxPrice}
                    onChange={handlePriceRange}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* all products  */}
          {allProductsLoad && (
            <p className='flex items-center justify-center'>
              <svg
                className='-ml-1 mr-3 h-16 w-16 animate-spin text-green-600'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
              >
                <circle
                  className='opacity-25'
                  cx='12'
                  cy='12'
                  r='10'
                  stroke='currentColor'
                  strokeWidth='4'
                ></circle>
                <path
                  className='opacity-75'
                  fill='currentColor'
                  d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                ></path>
              </svg>
            </p>
          )}
          {allProductsError && <p>Something is wrong </p>}
          {!allProductsLoad && !allProductsError && (
            <div className='grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'>
              {allProducts?.data?.map((product: ProductCardType) => (
                <ProductCard key={Math.random()} product={product} />
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
};

export default ProductFilter;
