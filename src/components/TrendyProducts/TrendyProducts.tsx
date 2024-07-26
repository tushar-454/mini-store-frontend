import { FaRegArrowAltCircleRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Container from '../shared/Container';
import Title from '../shared/Title';

const TrendyProducts = () => {
  return (
    <section>
      <Container>
        <div className='mb-10 mt-20 flex items-center justify-between border-b-2 pb-3'>
          <Title>
            <Link to={'/product/filter'} className='text-green-600'>
              Trendy
            </Link>{' '}
            Products 🛍️
          </Title>
          <Link
            to={'/product/filter'}
            className='text-lg font-bold underline sm:text-xl'
          >
            View All Products
          </Link>
        </div>
        {/* trandy product layout  */}
        <div className='mb-20 flex h-auto flex-col justify-between gap-5 lg:h-64 lg:flex-row'>
          {/* 1st column  */}
          <div
            data-aos='fade-right'
            data-aos-duration='600'
            className='group relative h-full w-full overflow-hidden rounded-lg border bg-white text-black transition-all hover:bg-green-600 hover:text-white lg:w-1/4'
          >
            <p className='p-4 text-2xl font-bold'>Western Blazer</p>
            <img
              src='https://i.ibb.co/2Mxkfpx/RRWT92-R0-D2-A.webp'
              alt=''
              className=''
            />
            <Link to={'/product/filter'}>
              <FaRegArrowAltCircleRight className='absolute right-10 top-16 -rotate-45 cursor-pointer text-3xl text-green-600 transition-all hover:-rotate-[405deg] hover:text-orange-500 group-hover:text-orange-500' />
            </Link>
          </div>
          {/* 2nd column  */}
          <div
            data-aos='fade-up'
            data-aos-duration='600'
            className='white grid w-full grid-cols-1 gap-5 text-white sm:grid-cols-2 lg:w-2/4'
          >
            <div className='col-span-1 rounded-lg border bg-green-50 p-5 text-white'>
              <p className='text-2xl font-bold text-black'>Phone Accessories</p>
              <Link
                to={'/product/filter'}
                className='font-semibold text-black underline'
              >
                Collection
              </Link>
            </div>
            <div className='col-span-1 rounded-lg border bg-green-50 p-5 text-white'>
              <p className='text-2xl font-bold text-black'>Pports & Fitness</p>
              <Link
                to={'/product/filter'}
                className='font-semibold text-black underline'
              >
                Collection
              </Link>
            </div>
            <div className='col-span-1 rounded-lg border bg-green-50 p-5 text-white'>
              <p className='text-2xl font-bold text-black'>
                Outdoor & Travelling
              </p>
              <Link
                to={'/product/filter'}
                className='font-semibold text-black underline'
              >
                Collection
              </Link>
            </div>
            <div className='col-span-1 rounded-lg border bg-green-50 p-5 text-white'>
              <p className='text-2xl font-bold text-black'>Gadgets</p>
              <Link
                to={'/product/filter'}
                className='font-semibold text-black underline'
              >
                Collection
              </Link>
            </div>
          </div>
          {/* 3rd column  */}
          <div
            data-aos='fade-left'
            data-aos-duration='600'
            className='group relative h-full w-full overflow-hidden rounded-lg border bg-white text-black transition-all hover:bg-green-600 hover:text-white lg:w-1/4'
          >
            <p className='p-4 text-2xl font-bold'>Special Offer</p>
            <img
              src='https://www.designerglasses.co.uk/media/uploads/product/HD%20Images/Police/police_spl_834_spl834_sunglasses_494257-51.png'
              alt=''
              className=''
            />
            <Link to={'/product/filter'}>
              <FaRegArrowAltCircleRight className='absolute right-10 top-16 -rotate-45 cursor-pointer text-3xl text-green-600 transition-all hover:-rotate-[405deg] hover:text-orange-500 group-hover:text-orange-500' />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default TrendyProducts;
