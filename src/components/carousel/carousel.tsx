'use client';

import { useCarouselQuery } from '@/api/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { useRef } from 'react';
import { Container } from '../shared/container';
import { CarouselSkeleton } from '../skeleton/carousel';
import {
  Carousel as AsCarousel,
  CarouselItem as AsCarouselItem,
  CarouselContent,
} from '../ui/carousel';
import { TypographyMuted, TypographyP } from '../ui/typography';
import { CarouselItem } from './carousel_item';

const Carousel = () => {
  const { data, isLoading, isError } = useCarouselQuery();
  const { data: carousels } = data || { success: false, data: [] };
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  if (isLoading && !isError) {
    return <CarouselSkeleton />;
  }

  if ((!isLoading && isError) || carousels === undefined) {
    return (
      <Container>
        <TypographyP className='my-8 grid h-32 place-content-center rounded-2xl border text-center text-red-500'>
          Failed to load carousels
        </TypographyP>
      </Container>
    );
  }

  if (!isLoading && !isError && Array.isArray(carousels) && carousels.length === 0) {
    return (
      <Container>
        <TypographyMuted className='my-8 grid h-32 place-content-center rounded-2xl border text-center'>
          No carousels found
        </TypographyMuted>
      </Container>
    );
  }

  return (
    <section>
      <Container>
        {/* Carousel wrapper  */}
        <div className='my-8'>
          <AsCarousel opts={{ align: 'start', loop: true }} plugins={[plugin.current]}>
            <CarouselContent>
              {carousels.map((carousel) => (
                <AsCarouselItem key={carousel._id}>
                  <CarouselItem carousel={carousel} />
                </AsCarouselItem>
              ))}
            </CarouselContent>
          </AsCarousel>
        </div>
      </Container>
    </section>
  );
};

export { Carousel };
