import { Container } from '@/components/shared/container';

const Loading = () => {
  return (
    <Container>
      <div className='flex gap-5 py-8'>
        <div className='hidden h-screen w-[400px] animate-pulse rounded-2xl bg-neutral-100 lg:block'></div>
        <div className='grid flex-grow grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3'>
          <div className='h-96 animate-pulse rounded-2xl bg-neutral-200'></div>
          <div className='h-96 animate-pulse rounded-2xl bg-neutral-200'></div>
          <div className='h-96 animate-pulse rounded-2xl bg-neutral-200'></div>
          <div className='h-96 animate-pulse rounded-2xl bg-neutral-200'></div>
          <div className='h-96 animate-pulse rounded-2xl bg-neutral-200'></div>
          <div className='h-96 animate-pulse rounded-2xl bg-neutral-200'></div>
        </div>
      </div>
    </Container>
  );
};

export default Loading;
