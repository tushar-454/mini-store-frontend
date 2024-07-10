import Container from '../shared/Container';

const DealandOffer = () => {
  return (
    <section>
      <Container>
        {/* wrapper  */}
        <div className='flex flex-col items-center justify-between gap-5 py-20 lg:items-start xl:flex-row'>
          {/* offer coundown  */}
          <div>
            <span className='mb-4 block text-center text-3xl font-black text-black lg:text-start'>
              Deals and Offers
            </span>
            <div className='flex flex-wrap gap-2'>
              <div className='offer-countdown'>
                <span className='text-3xl'>04</span>
                <span>Days</span>
              </div>
              <div className='offer-countdown'>
                <span className='text-3xl'>20</span>
                <span>Hours</span>
              </div>
              <div className='offer-countdown'>
                <span className='text-3xl'>45</span>
                <span>Minutes</span>
              </div>
              <div className='offer-countdown'>
                <span className='text-3xl'>04</span>
                <span>Secounds</span>
              </div>
            </div>
          </div>
          {/* offer products  */}
          <div className='flex flex-wrap gap-5'>
            {[{}, {}, {}, {}, {}].map((_, inx) => (
              <div
                key={inx}
                className='grid w-40 flex-grow basis-[200px] gap-1 rounded-lg bg-neutral-50 p-2 xl:flex-grow xl:basis-auto'
              >
                <div className='relative mb-2'>
                  <img
                    src='https://static-01.daraz.com.bd/p/d64a3d50a2df4ae391cdade5aee26b04.jpg_750x400.jpg_.webp'
                    alt='product image'
                    className='w-full rounded-lg object-cover'
                  />
                  <small className='absolute left-1 top-1 grid h-6 w-12 place-items-center rounded-full bg-red-100 font-bold text-red-500'>
                    20%
                  </small>
                </div>
                <span className='font-medium'>Hand Bag</span>
                <span>
                  Price: <b className='text-lg'>$320</b>
                </span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default DealandOffer;
