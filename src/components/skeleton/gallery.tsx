const GallerySkeleton = () => {
  return (
    <div className='my-8 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
      <div className='h-40 w-full animate-pulse rounded-lg bg-gray-200 md:h-96'></div>
      <div className='h-40 w-full animate-pulse rounded-lg bg-gray-200 md:h-96'></div>
      <div className='h-40 w-full animate-pulse rounded-lg bg-gray-200 md:h-96'></div>
      <div className='h-40 w-full animate-pulse rounded-lg bg-gray-200 md:h-96'></div>
    </div>
  );
};

export default GallerySkeleton;
