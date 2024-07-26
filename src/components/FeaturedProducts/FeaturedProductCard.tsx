interface FeaturedProductCardProps {
  product: productType;
}
import { CiShoppingCart } from 'react-icons/ci';
import { Link } from 'react-router-dom';
import { productType } from '../../Data/FeaturedProducts';

const FeaturedProductCard: React.FC<FeaturedProductCardProps> = ({
  product,
}) => {
  return (
    <div
      data-aos='fade-up'
      data-aos-duration='800'
      className='flex h-full w-full flex-col space-y-2 place-self-center rounded-lg bg-neutral-100 p-3 shadow-lg sm:w-80'
    >
      <div className='group relative'>
        <img
          src={product.image}
          alt={product.name}
          className='h-80 w-full rounded-lg object-cover'
        />
        <span className='absolute left-0 top-0 h-full w-full rounded-lg bg-[#00000090] opacity-0 transition-all group-hover:opacity-100'></span>
        <div className='absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center gap-5 opacity-0 transition-all group-hover:opacity-100'>
          <Link
            to={`/product`}
            className='w-11/12 rounded-lg border-2 border-green-600 bg-white px-4 py-2 text-center font-bold text-green-600'
          >
            View Details
          </Link>
          <button className='w-11/12 rounded-lg border-2 border-green-600 bg-green-600 px-4 py-2 text-center font-bold text-neutral-200'>
            Order Now
          </button>
        </div>
      </div>
      <p className='grow font-medium'>
        {product.name.length > 80
          ? `${product.name.slice(0, 80)} . . .`
          : product.name}
      </p>
      <p className='flex items-center justify-between'>
        <b>
          <small className='font-normal line-through'>{product.price}</small> BD
          -{' '}
          {Math.floor(product.price - (product.price * product.discount) / 100)}
        </b>
        <span>
          <CiShoppingCart className='h-8 w-8 cursor-pointer rounded-lg bg-orange-500 p-1 text-white' />
        </span>
      </p>
    </div>
  );
};

export default FeaturedProductCard;
