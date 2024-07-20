// import WishlistsArr from '../Data/WishList';
import ProductCard, {
  ProductCardType,
} from '../components/Product/ProductCard';
import Breadcrumb from '../components/shared/Breadcrumb';
import Container from '../components/shared/Container';
import { getLocalStorage } from '../utils/localStorage';

const Wishlists = () => {
  const WishlistsArr = getLocalStorage('wishLists');
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
        {WishlistsArr?.length === 0 && (
          <p className='h-screen text-lg'>No wishlists product yet</p>
        )}
        {WishlistsArr?.length > 0 && (
          <div className='grid grid-cols-1 justify-between gap-5 pb-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {WishlistsArr?.map((product: ProductCardType) => (
              <ProductCard key={Math.random()} product={product} />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
};

export default Wishlists;
