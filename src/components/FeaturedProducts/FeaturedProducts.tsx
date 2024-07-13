import { useState } from 'react';
import FeaturedProductsArr from '../../Data/FeaturedProducts';
import Container from '../shared/Container';
import Title from '../shared/Title';
import FeaturedProductCard from './FeaturedProductCard';

const FeaturedProducts = () => {
  const [idx, setIdx] = useState(0);

  // show product based on click idx tab
  const showProduct = (index: number) => {
    setIdx(index);
  };

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
            {FeaturedProductsArr.map((item, index) => (
              <li
                key={Math.random()}
                onClick={() => showProduct(index)}
                className={`featured-tab ${idx === index ? 'bg-orange-500 text-white' : 'hover:bg-orange-100'}`}
              >
                {item.category}
              </li>
            ))}
          </ul>
        </div>
        {/* show featured products */}
        <div className='my-10 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {FeaturedProductsArr[idx].products.map((product) => (
            <FeaturedProductCard key={Math.random()} product={product} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default FeaturedProducts;
