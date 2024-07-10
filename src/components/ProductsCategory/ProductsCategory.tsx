import { useRef } from 'react';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';
import Container from '../shared/Container';
import Title from '../shared/Title';

const ProductsCategory = () => {
  const productsList = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
  const products = useRef<HTMLDivElement | null>(null);
  let idx = 0;
  const rightScroll = () => {
    if (idx * 148 > productsList.length * 148) {
      idx = 0;
    } else {
      idx += 3;
    }
    products.current?.scrollTo({
      left: idx * 148,
      behavior: 'smooth',
    });
  };
  const leftScroll = () => {
    if (idx < 0) {
      idx = productsList.length - 1;
    } else {
      idx -= 3;
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
          <div className='absolute left-0 top-0 z-50 flex h-full w-full items-center justify-between'>
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
            className='my-8 flex cursor-all-scroll select-none justify-between gap-5 overflow-hidden'
          >
            {productsList.map((_, index) => (
              <div
                key={index}
                id='product-item'
                className='relative -left-0 grid min-w-32 place-items-center gap-2 rounded-lg bg-neutral-100 p-4 transition-all'
              >
                <img
                  src='https://lifestylebyps.com/cdn/shop/articles/sreet_style_looks_1080x.jpg?v=1542779682'
                  alt='man'
                  className='w-20 rounded-full'
                />
                <b>Man</b>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ProductsCategory;
