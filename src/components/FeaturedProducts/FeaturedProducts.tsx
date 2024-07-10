import Container from '../shared/Container';
import Title from '../shared/Title';
import FeaturedProductCard from './FeaturedProductCard';

const FeaturedProducts = () => {
  return (
    <section>
      <Container>
        <div className='mb-10 mt-20 flex items-center justify-between border-b-2 pb-3'>
          <Title>
            <span className='text-green-600'>Featured</span> Products 💥
          </Title>
          <button className='text-lg font-bold underline sm:text-xl'>
            View All Products
          </button>
        </div>
        {/* tabs */}
        <div>
          <ul className='flex flex-wrap gap-5'>
            <li className='featured-tab bg-orange-500 text-white'>
              All Arrival
            </li>
            <li className='featured-tab'>Men</li>
            <li className='featured-tab'>Women</li>
            <li className='featured-tab'>Children</li>
            <li className='featured-tab'>Sports</li>
            <li className='featured-tab'>Travel</li>
            <li className='featured-tab'>Electronics</li>
          </ul>
        </div>
        {/* show featured products */}
        <div className='my-10 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {[{}, {}, {}, {}, {}, {}, {}, {}].map((_, index) => (
            <FeaturedProductCard key={index} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default FeaturedProducts;
