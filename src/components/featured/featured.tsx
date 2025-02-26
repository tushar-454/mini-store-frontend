import { TProduct } from '@/api/product';
import { BASE_URL } from '@/constant';
import { Container } from '../shared/container';
import { ProductResponse } from '../top_selling/top_selling';
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel';
import Gradient from '../ui/gradient';
import { TypographyH2, TypographyP } from '../ui/typography';
import FeaturedCard from './featured_card';

const Featured = async () => {
  let products: TProduct[] = [];
  let error: string | null = null;
  let placeholder;

  // Fetch top cakes
  try {
    const res: Response = await fetch(`${BASE_URL}/product?is_deleted=false&is_featured=true`, {
      next: { revalidate: 600, tags: ['featuredcakes'] },
    });

    if (!res.ok) {
      error = 'Failed to fetch featured cakes';
      throw new Error('Failed to fetch featured cakes');
    }

    const { success, data }: ProductResponse = await res.json();
    if (success && data && Array.isArray(data)) {
      products = data || [];
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
  // error handling
  if (error) {
    placeholder = <TypographyP className='my-20 text-center text-red-500'>{error}</TypographyP>;
  }
  // if no products found
  if (!products || (!error && products && Array.isArray(products) && products.length === 0)) {
    placeholder = (
      <TypographyP className='my-20 text-center text-secondary-foreground/50'>
        No featured cake found at the moment
      </TypographyP>
    );
  }
  // if products found
  if (products && Array.isArray(products) && products.length > 0) {
    placeholder = (
      <>
        <div className='my-8'>
          <Carousel opts={{ align: 'start', loop: true }}>
            <CarouselContent>
              {products.map((product) => (
                <CarouselItem key={product._id} className='sm:basis-1/2 md:basis-1/3 lg:basis-1/4'>
                  <FeaturedCard product={product} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </>
    );
  }

  return (
    <section>
      <Container>
        <TypographyH2 id='featured'>
          <Gradient>Featured</Gradient>
        </TypographyH2>
        {placeholder}
      </Container>
    </section>
  );
};

export { Featured };
