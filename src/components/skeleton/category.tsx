import { Container } from '../shared/container';

const CategorySkeleton = () => {
  return (
    <Container>
      <div className='my-4 flex flex-nowrap items-center justify-between gap-6 overflow-x-hidden'>
        {[{}, {}, {}, {}, {}, {}, {}]?.map((_, index) => (
          <div
            key={Math.random()}
            className={`flex select-none flex-col items-center gap-3 px-10 ${index === 0 ? 'pl-0' : ''} ${index === 6 ? 'pr-0' : ''}`}
          >
            <div className='h-24 min-w-24 animate-pulse select-none rounded-full bg-secondary-foreground/20 object-cover'></div>
            <span className='h-4 min-w-20 animate-pulse rounded-full bg-secondary-foreground/10 text-center'></span>
          </div>
        ))}
      </div>
    </Container>
  );
};

export { CategorySkeleton };
