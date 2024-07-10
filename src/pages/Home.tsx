import BrandSponsor from '../components/BrandSponsor/BrandSponsor';
import Carousel from '../components/Carousel/Carousel';
import DealandOffer from '../components/DealandOffer/DealandOffer';
import FeaturedProducts from '../components/FeaturedProducts/FeaturedProducts';
import ProductsCategory from '../components/ProductsCategory/ProductsCategory';
import TrendyProducts from '../components/TrendyProducts/TrendyProducts';

const Home = () => {
  return (
    <>
      <Carousel />
      <DealandOffer />
      <BrandSponsor />
      <ProductsCategory />
      <FeaturedProducts />
      <TrendyProducts />
    </>
  );
};

export default Home;
