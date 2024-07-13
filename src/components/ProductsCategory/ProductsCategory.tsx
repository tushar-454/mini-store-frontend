import { useRef, useState } from 'react';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ProductsCategoryArr, {
  ProductType,
} from '../../Data/ProductsCategory.tsx';
import Container from '../shared/Container';
import Title from '../shared/Title';

const ProductsCategory = () => {
  const products = useRef<HTMLDivElement | null>(null);
  const [idx, setIdx] = useState<number>(0);
  const rightScroll = () => {
    if (idx * 148 > ProductsCategoryArr.length * 148) {
      setIdx(0);
    } else {
      setIdx((i) => i + 3);
    }
    products.current?.scrollTo({
      left: idx * 148,
      behavior: 'smooth',
    });
  };
  const leftScroll = () => {
    if (idx < 0) {
      setIdx(ProductsCategoryArr.length - 1);
    } else {
      setIdx((i) => i - 3);
    }
    products.current?.scrollTo({
      left: idx * 148,
      behavior: 'smooth',
    });
  };
  return (
    <section>
      <Container>
        <Title>
          Products <span className='text-green-600'>Category</span>
        </Title>
        {/* products wrapper  */}
        <div className='relative'>
          {/* control arrow  */}
          <div className='absolute left-0 top-0 flex h-full w-full items-center justify-between'>
            <FaArrowAltCircleLeft
              onClick={leftScroll}
              className='cursor-pointer select-none text-4xl text-orange-500'
            />
            <FaArrowAltCircleRight
              onClick={rightScroll}
              className='cursor-pointer select-none text-4xl text-orange-500'
            />
          </div>
          <div
            ref={products}
            className='my-8 flex cursor-all-scroll select-none justify-evenly gap-5 overflow-hidden'
          >
            {ProductsCategoryArr.map((category: ProductType) => (
              <div
                key={Math.random()}
                id='product-item'
                className='relative -left-0 min-w-32 rounded-lg bg-neutral-100 p-4 transition-all'
              >
                <Link
                  to={category.link}
                  className='grid place-items-center gap-2'
                >
                  <img
                    src={category.image}
                    alt='man'
                    className='h-20 w-20 rounded-full object-cover'
                  />
                  <b>{category.name}</b>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ProductsCategory;
