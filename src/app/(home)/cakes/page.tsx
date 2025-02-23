import { TProductResponse } from '@/api/product';
import CakeCard from '@/components/cakes/cake_card';
import CakesFilter from '@/components/cakes/cake_filter';
import { Container } from '@/components/shared/container';
import { BASE_URL } from '@/constant';

type CakesProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  searchParams: any;
};

const Cakes = async ({ searchParams }: CakesProps) => {
  const min_price = searchParams.min_price;
  const max_price = searchParams.max_price;
  const category = searchParams.category;

  const query = new URLSearchParams();
  if (min_price) query.append('min_price', min_price);
  if (max_price) query.append('max_price', max_price);
  if (category) query.append('category', category);

  const res: Response = await fetch(`${BASE_URL}/product/?is_deleted=false&${query.toString()}`, {
    next: {
      revalidate: 300,
      tags: ['cakes'],
    },
  });
  const { data: cakes = [] }: TProductResponse = await res.json();

  return (
    <Container>
      <div className='my-8 flex gap-3'>
        <CakesFilter />
        <div className='grid flex-grow grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3'>
          {cakes.map((cake) => (
            <CakeCard key={cake._id} product={cake} />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Cakes;
