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
            data-aos='fade-up'
            data-aos-duration='500'
            src={amazon}
            alt='amazon icons'
            className='w-34 transition-all hover:scale-110'
          />
          <img
            data-aos='fade-up'
            data-aos-duration='600'
            src={aliexpress}
            alt='aliexpress icons'
            className='w-34 transition-all hover:scale-110'
          />
          <img
            data-aos='fade-up'
            data-aos-duration='700'
            src={bestbuy}
            alt='bestbuy icons'
            className='w-34 transition-all hover:scale-110'
          />
          <img
            data-aos='fade-up'
            data-aos-duration='800'
            src={bigcommerce}
            alt='bigcommerce icons'
            className='w-34 transition-all hover:scale-110'
          />
          <img
            data-aos='fade-up'
            data-aos-duration='900'
            src={ebay}
            alt='ebay icons'
            className='w-34 transition-all hover:scale-110'
          />
          <img
            data-aos='fade-up'
            data-aos-duration='1000'
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
