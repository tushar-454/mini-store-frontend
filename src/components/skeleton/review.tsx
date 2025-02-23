import { Star } from 'lucide-react';

const ReviewSkeleton = () => {
  return (
    <div className='grid grid-cols-1 gap-6 overflow-x-hidden md:grid-cols-2 lg:grid-cols-3'>
      <div className='my-8 h-[355px] w-full rounded-2xl border bg-white p-10 shadow-md'>
        <div className='flex h-full flex-col'>
          <p className='mb-2 h-4 w-full animate-pulse rounded-full bg-secondary-foreground/10 text-center'></p>
          <p className='mb-2 h-4 w-11/12 animate-pulse rounded-full bg-secondary-foreground/10 text-center'></p>
          <p className='mb-2 h-4 w-10/12 animate-pulse rounded-full bg-secondary-foreground/10 text-center'></p>
          <p className='mb-2 h-4 w-full animate-pulse rounded-full bg-secondary-foreground/10 text-center'></p>
          <p className='mb-2 h-4 w-10/12 animate-pulse rounded-full bg-secondary-foreground/10 text-center'></p>
          <div className='mt-8 flex flex-grow flex-col items-center justify-end gap-2'>
            <span className='flex items-center gap-1'>
              <Star size={16} className='animate-pulse text-secondary-foreground/10' />
              <Star size={16} className='animate-pulse text-secondary-foreground/10' />
              <Star size={16} className='animate-pulse text-secondary-foreground/10' />
              <Star size={16} className='animate-pulse text-secondary-foreground/10' />
              <Star size={16} className='animate-pulse text-secondary-foreground/10' />
            </span>
            <p className='size-14 animate-pulse cursor-pointer rounded-full bg-secondary-foreground/10 object-cover shadow'></p>
            <p className='flex w-full flex-col items-center justify-center'>
              <p className='mb-2 h-4 w-[12%] animate-pulse rounded-full bg-secondary-foreground/10'></p>
              <p className='h-4 w-[18%] animate-pulse rounded-full bg-secondary-foreground/10'></p>
            </p>
          </div>
        </div>
      </div>
      <div className='my-8 h-[355px] w-full rounded-2xl border bg-white p-10 shadow-md'>
        <div className='flex h-full flex-col'>
          <p className='mb-2 h-4 w-full animate-pulse rounded-full bg-secondary-foreground/10 text-center'></p>
          <p className='mb-2 h-4 w-11/12 animate-pulse rounded-full bg-secondary-foreground/10 text-center'></p>
          <p className='mb-2 h-4 w-10/12 animate-pulse rounded-full bg-secondary-foreground/10 text-center'></p>
          <p className='mb-2 h-4 w-full animate-pulse rounded-full bg-secondary-foreground/10 text-center'></p>
          <p className='mb-2 h-4 w-10/12 animate-pulse rounded-full bg-secondary-foreground/10 text-center'></p>
          <div className='mt-8 flex flex-grow flex-col items-center justify-end gap-2'>
            <span className='flex items-center gap-1'>
              <Star size={16} className='animate-pulse text-secondary-foreground/10' />
              <Star size={16} className='animate-pulse text-secondary-foreground/10' />
              <Star size={16} className='animate-pulse text-secondary-foreground/10' />
              <Star size={16} className='animate-pulse text-secondary-foreground/10' />
              <Star size={16} className='animate-pulse text-secondary-foreground/10' />
            </span>
            <p className='size-14 animate-pulse cursor-pointer rounded-full bg-secondary-foreground/10 object-cover shadow'></p>
            <p className='flex w-full flex-col items-center justify-center'>
              <p className='mb-2 h-4 w-[12%] animate-pulse rounded-full bg-secondary-foreground/10'></p>
              <p className='h-4 w-[18%] animate-pulse rounded-full bg-secondary-foreground/10'></p>
            </p>
          </div>
        </div>
      </div>
      <div className='my-8 h-[355px] w-full rounded-2xl border bg-white p-10 shadow-md'>
        <div className='flex h-full flex-col'>
          <p className='mb-2 h-4 w-full animate-pulse rounded-full bg-secondary-foreground/10 text-center'></p>
          <p className='mb-2 h-4 w-11/12 animate-pulse rounded-full bg-secondary-foreground/10 text-center'></p>
          <p className='mb-2 h-4 w-10/12 animate-pulse rounded-full bg-secondary-foreground/10 text-center'></p>
          <p className='mb-2 h-4 w-full animate-pulse rounded-full bg-secondary-foreground/10 text-center'></p>
          <p className='mb-2 h-4 w-10/12 animate-pulse rounded-full bg-secondary-foreground/10 text-center'></p>
          <div className='mt-8 flex flex-grow flex-col items-center justify-end gap-2'>
            <span className='flex items-center gap-1'>
              <Star size={16} className='animate-pulse text-secondary-foreground/10' />
              <Star size={16} className='animate-pulse text-secondary-foreground/10' />
              <Star size={16} className='animate-pulse text-secondary-foreground/10' />
              <Star size={16} className='animate-pulse text-secondary-foreground/10' />
              <Star size={16} className='animate-pulse text-secondary-foreground/10' />
            </span>
            <p className='size-14 animate-pulse cursor-pointer rounded-full bg-secondary-foreground/10 object-cover shadow'></p>
            <p className='flex w-full flex-col items-center justify-center'>
              <p className='mb-2 h-4 w-[12%] animate-pulse rounded-full bg-secondary-foreground/10'></p>
              <p className='h-4 w-[18%] animate-pulse rounded-full bg-secondary-foreground/10'></p>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewSkeleton;
