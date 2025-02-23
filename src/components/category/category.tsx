'use client';

import { useCategoryQuery } from '@/api/category';
import Autoplay from 'embla-carousel-autoplay';
import { useRef } from 'react';
import { Container } from '../shared/container';
import { CategorySkeleton } from '../skeleton/category';
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel';
import Gradient from '../ui/gradient';
import { TypographyH2, TypographyMuted, TypographyP } from '../ui/typography';
import { CategoryCard } from './category_card';

const Category = () => {
  const { data: { data: categories } = {}, isLoading, isError } = useCategoryQuery();
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  let placeholder;
  if (isLoading && !isError) {
    placeholder = <CategorySkeleton />;
  }

  if (!isLoading && isError) {
    placeholder = (
      <TypographyP className='text-center text-red-500'>Failed to load categories</TypographyP>
    );
  }

  if (!isLoading && !isError && Array.isArray(categories) && categories.length === 0) {
    placeholder = <TypographyMuted className='text-center'>No categories found</TypographyMuted>;
  }

  return (
    <section>
      <Container>
        <TypographyH2>
          <Gradient>Category</Gradient>
        </TypographyH2>
        {/* wrapper  */}
        {placeholder ? (
          placeholder
        ) : (
          <div className='my-4'>
            <Carousel opts={{ align: 'start', loop: true }} plugins={[plugin.current]}>
              <CarouselContent>
                {Array.isArray(categories) &&
                  categories.map((category) => (
                    <CarouselItem
                      key={category._id}
                      className='basis-1/2 sm:basis-1/3 md:basis-1/5 lg:basis-1/6'
                    >
                      <CategoryCard category={category} />
                    </CarouselItem>
                  ))}
              </CarouselContent>
            </Carousel>
          </div>
        )}
      </Container>
    </section>
  );
};

export { Category };
