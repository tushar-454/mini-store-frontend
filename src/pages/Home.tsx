import BrandSponsor from '../components/BrandSponsor/BrandSponsor';
import Carousel from '../components/Carousel/Carousel';
import DealandOffer from '../components/DealandOffer/DealandOffer';
import ProductsCategory from '../components/ProductsCategory/ProductsCategory';

const Home = () => {
  return (
    <>
      <Carousel />
      <DealandOffer />
      <BrandSponsor />
      <ProductsCategory />
    </>
  );
};

export default Home;
