import aliexpress from '../../assets/aliexpress.webp';
import amazon from '../../assets/amazone.webp';
import bestbuy from '../../assets/bestbuy.webp';
import bigcommerce from '../../assets/bigcommerce.webp';
import ebay from '../../assets/ebay.webp';
import walmart from '../../assets/walmart.webp';
import Container from '../shared/Container';

const BrandSponsor = () => {
  return (
    <section className='bg-green-500'>
      <Container>
        {/* wrapper  */}
        <div className='mb-20 flex flex-wrap items-center justify-evenly gap-5 py-12'>
          <img
            src={amazon}
            alt='amazon icons'
            className='w-34 transition-all hover:scale-110'
          />
          <img
            src={aliexpress}
            alt='aliexpress icons'
            className='w-34 transition-all hover:scale-110'
          />
          <img
            src={bestbuy}
            alt='bestbuy icons'
            className='w-34 transition-all hover:scale-110'
          />
          <img
            src={bigcommerce}
            alt='bigcommerce icons'
            className='w-34 transition-all hover:scale-110'
          />
          <img
            src={ebay}
            alt='ebay icons'
            className='w-34 transition-all hover:scale-110'
          />
          <img
            src={walmart}
            alt='walmart icons'
            className='w-34 transition-all hover:scale-110'
          />
        </div>
      </Container>
    </section>
  );
};

export default BrandSponsor;
