import { Star } from 'lucide-react';

const CakeDetailsSkeleton = () => {
  return (
    <div className='my-8 flex flex-wrap'>
      {/*  Product Images  */}
      <div className='mb-8 w-full px-4 md:w-1/2'>
        <div className='h-[32rem] w-full 2xl:h-[40rem]'>
          <div className='mb-4 h-full w-full animate-pulse rounded-lg bg-neutral-200 object-cover shadow-md hover:object-contain' />
        </div>
        <div className='flex justify-center gap-4 overflow-x-auto py-4'>
          <div
            className={`size-16 animate-pulse cursor-pointer rounded-md bg-neutral-200 object-cover transition duration-300 hover:opacity-100 sm:size-20`}
          />
          <div
            className={`size-16 animate-pulse cursor-pointer rounded-md bg-neutral-200 object-cover transition duration-300 hover:opacity-100 sm:size-20`}
          />
          <div
            className={`size-16 animate-pulse cursor-pointer rounded-md bg-neutral-200 object-cover transition duration-300 hover:opacity-100 sm:size-20`}
          />
        </div>
      </div>

      {/*  Product Details  */}
      <div className='w-full px-4 md:w-1/2'>
        <h2 className='mb-2 h-4 w-auto animate-pulse bg-neutral-200 text-3xl font-bold lg:w-96'></h2>
        <div className={'h-4 w-20 animate-pulse bg-neutral-200'}></div>
        <div className='my-2'></div>

        <div className='my-4 flex items-center gap-2'>
          <Star className='h-4 w-4 animate-pulse text-neutral-200' />
          <Star className='h-4 w-4 animate-pulse text-neutral-200' />
          <Star className='h-4 w-4 animate-pulse text-neutral-200' />
          <Star className='h-4 w-4 animate-pulse text-neutral-200' />
          <Star className='h-4 w-4 animate-pulse text-neutral-200' />
        </div>

        <p className='my-4 h-4 w-full animate-pulse bg-neutral-200 text-gray-700'></p>
        <p className='my-4 h-4 w-full animate-pulse bg-neutral-200 text-gray-700'></p>
        <p className='my-4 h-4 w-full animate-pulse bg-neutral-200 text-gray-700'></p>
        <p className='my-4 h-4 w-full animate-pulse bg-neutral-200 text-gray-700'></p>
        <p className='my-4 h-4 w-full animate-pulse bg-neutral-200 text-gray-700'></p>
        <p className='my-4 h-4 w-full animate-pulse bg-neutral-200 text-gray-700'></p>
        <p className='my-4 h-4 w-full animate-pulse bg-neutral-200 text-gray-700'></p>
        <p className='my-4 h-4 w-full animate-pulse bg-neutral-200 text-gray-700'></p>
        <p className='my-4 mt-10 h-8 w-32 animate-pulse rounded-full bg-neutral-200 text-gray-700'></p>
      </div>
    </div>
  );
};

export { CakeDetailsSkeleton };
