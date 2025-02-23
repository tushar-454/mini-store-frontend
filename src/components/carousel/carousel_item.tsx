import { TCarousel } from '@/api/carousel';
import Image from 'next/image';
import Link from 'next/link';
import { memo } from 'react';
import { Button } from '../ui/button';

const Item = ({ carousel }: { carousel: TCarousel }) => {
  const { button_link, button_text, description, image, title } = carousel;
  return (
    <div className='group relative h-full min-w-full'>
      <Image
        src={
          image ||
          'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg'
        }
        loading='lazy'
        alt={title || 'carousel image'}
        width={1020}
        height={720}
        className='h-full w-full rounded-2xl object-cover'
      />
      {button_link && button_text && description && title && (
        <span className='absolute left-0 top-0 block h-full w-full rounded-xl transition-all group-hover:bg-[#00000099]'></span>
      )}
      <div className='lmospace-y-1 absolute bottom-0 left-0 w-full px-2 py-5 sm:px-16 lg:w-3/5 lg:space-y-5'>
        <h1 className='text-xl font-bold text-white sm:text-2xl md:text-4xl lg:text-6xl'>
          {title}
        </h1>
        <p className='lmo:block hidden text-white'>{description}</p>
        <p className='lmo:hidden block text-white'>
          {description ? `${description?.slice(0, 30)} . . .` : ''}
        </p>
        {button_text && (
          <Link href={button_link || '/'} className='mt-2 inline-block'>
            <Button variant={'outline'}>{button_text}</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

const CarouselItem = memo(Item);

export { CarouselItem };
