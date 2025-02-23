'use client';
import { useReviewsQuery } from '@/api/reviews';
import Autoplay from 'embla-carousel-autoplay';
import { useRef } from 'react';
import { Container } from '../shared/container';
import ReviewSkeleton from '../skeleton/review';
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel';
import Gradient from '../ui/gradient';
import { TypographyH2, TypographyMuted, TypographyP } from '../ui/typography';
import { ReviewCard } from './review_card';

const Reviews = () => {
  const { data, isLoading, isError } = useReviewsQuery();
  const { data: reviews } = data || { success: false, data: [] };

  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  let placeholder;
  if (isLoading && !isError) {
    placeholder = <ReviewSkeleton />;
  }

  if (!isLoading && isError) {
    placeholder = (
      <TypographyP className='text-center text-red-500'>Failed to load reviews</TypographyP>
    );
  }

  if (!isLoading && !isError && Array.isArray(reviews) && reviews.length === 0) {
    placeholder = <TypographyMuted className='text-center'>No reviews found</TypographyMuted>;
  }

  return (
    <section>
      <Container>
        <TypographyH2 id='reviews'>
          <Gradient>Reviews & Feedback</Gradient>
        </TypographyH2>
        {/* wrapper  */}
        {placeholder ? (
          <div className='my-8'>{placeholder}</div>
        ) : (
          <div className='my-8'>
            {/* product */}
            <Carousel
              opts={{
                align: 'start',
                loop: true,
              }}
              plugins={[plugin.current]}
            >
              <CarouselContent>
                {reviews &&
                  reviews?.map((review) => (
                    <CarouselItem key={review._id} className='sm:basis-1/2 lg:basis-1/3'>
                      <ReviewCard review={review} />
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

export { Reviews };
