import WishlistsArr from '../Data/WishList';
import FeaturedProductCard from '../components/FeaturedProducts/FeaturedProductCard';
import Breadcrumb from '../components/shared/Breadcrumb';
import Container from '../components/shared/Container';

const Wishlists = () => {
  return (
    <section>
      <Container>
        {/* wrapper  */}
        <div className='py-5'>
          <Breadcrumb
            breadcrumbArr={[
              { link: '/', name: 'Home' },
              { link: '/wishlist', name: 'Wishlist' },
            ]}
          />
        </div>
        {/* wishlists products  */}
        <div className='grid grid-cols-1 justify-between gap-5 pb-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {WishlistsArr.map((product) => (
            <FeaturedProductCard key={Math.random()} product={product} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Wishlists;
