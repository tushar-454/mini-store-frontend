import { TProduct } from '@/api/product';
import Image from 'next/image';
import Link from 'next/link';
import { InnerHTML } from '../shared/inner_html';
import { Rating } from '../shared/rating';
import { Taka } from '../shared/taka';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { TypographyH3, TypographyH4, TypographyP } from '../ui/typography';

const CakeCard = ({ product }: { product: TProduct }) => {
  return (
    <div
      key={product._id}
      className='relative flex h-full flex-col rounded-2xl border bg-white p-2 shadow-md'
    >
      {!product.stock && (
        <div className='absolute left-0 top-0 z-50 grid h-full w-full place-content-center rounded-2xl bg-black/60'>
          <TypographyH3 className='rounded bg-white p-4 text-black'>Out of Stock</TypographyH3>
        </div>
      )}
      <Link href={!product.stock ? '/' : `/products/${product.slug}`}>
        <Image
          src={product.images[0]}
          alt={product.name}
          width={500}
          height={500}
          className='h-[250px] w-full rounded-lg object-cover md:h-[280px] lg:h-[350px]'
          quality={85}
          loading='lazy'
        />
      </Link>
      <div className='flex flex-grow flex-col space-y-2 bg-white pt-2'>
        <div className='flex-grow'>
          <TypographyH4>{product.name}</TypographyH4>
          <TypographyP>
            {product.description.length > 90 ? (
              <InnerHTML content={`${product.description.slice(0, 90)} . . .`} />
            ) : (
              <InnerHTML content={product.description} />
            )}
          </TypographyP>
        </div>
        <div className='flex items-center justify-between gap-1'>
          <span className='flex flex-wrap items-center gap-1'>
            <Badge variant={'default'} className='whitespace-nowrap'>
              {product.category}
            </Badge>
            <Badge variant={'default'} className='whitespace-nowrap'>
              {product.sell_count} - Sold
            </Badge>
          </span>

          <span className='flex flex-col items-center gap-1'>
            <span>
              Rating:{' '}
              {product.rating.toString().length === 1 ? `${product.rating}.0` : product.rating}
            </span>
            <Rating rating={product.rating} />
          </span>
        </div>
        <div className='flex flex-wrap items-center justify-between gap-4'>
          <span className='flex flex-wrap items-center gap-1'>
            <TypographyH3 className='relative'>
              Price: <Taka size={24} />
              {product.price}{' '}
            </TypographyH3>
            <Badge variant={'destructive'} className='whitespace-nowrap'>
              {product.discount}% Off
            </Badge>
          </span>
          <Link href={!product.stock ? '/' : `/products/${product.slug}`}>
            <Button variant={'secondary'}>View Details</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CakeCard;
