import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Container } from '../shared/container';

const CarouselSkeleton = () => {
  return (
    <Container>
      <div className='relative my-8 h-full min-w-full'>
        <div className='h-40 w-full animate-pulse rounded-2xl bg-secondary-foreground/20 sm:h-60 md:h-96 2xl:h-[650px]'></div>
        <div className='absolute top-1/2 z-50 flex w-full -translate-y-1/2 items-center justify-between'>
          <span>
            <ChevronLeft className='cursor-pointer text-4xl text-white' />
          </span>
          <span>
            <ChevronRight className='cursor-pointer text-4xl text-white' />
          </span>
        </div>
      </div>
    </Container>
  );
};

export { CarouselSkeleton };
