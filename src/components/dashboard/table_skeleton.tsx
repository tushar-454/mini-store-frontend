const TableSkeleton = ({ height }: { height: string }) => {
  return (
    <div className='flex w-full flex-col space-y-2'>
      <div className={`${height} w-full animate-pulse bg-neutral-200`}></div>
      <div className={`${height} w-full animate-pulse bg-neutral-200`}></div>
      <div className={`${height} w-full animate-pulse bg-neutral-200`}></div>
      <div className={`${height} w-full animate-pulse bg-neutral-200`}></div>
      <div className={`${height} w-full animate-pulse bg-neutral-200`}></div>
      <div className={`${height} w-full animate-pulse bg-neutral-200`}></div>
      <div className={`${height} w-full animate-pulse bg-neutral-200`}></div>
      <div className={`${height} w-full animate-pulse bg-neutral-200`}></div>
      <div className={`${height} w-full animate-pulse bg-neutral-200`}></div>
      <div className={`${height} w-full animate-pulse bg-neutral-200`}></div>
      <div className={`${height} w-full animate-pulse bg-neutral-200`}></div>
      <div className={`${height} w-full animate-pulse bg-neutral-200`}></div>
      <div className={`${height} w-full animate-pulse bg-neutral-200`}></div>
      <div className={`${height} w-full animate-pulse bg-neutral-200`}></div>
    </div>
  );
};

export default TableSkeleton;
