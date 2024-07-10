import { useEffect, useState } from 'react';
const Carousel = () => {
  const [currentSlider, setCurrentSlider] = useState(0);
  const sliders = [
    'https://cdn.prod.website-files.com/60e3eea63871951801a505d5/63d7ab46aa84b8c8f8c44649_fynd%20thumbnail.webp',
    'https://devrix.com/wp-content/uploads/2020/06/How-to-Quickly-Build-an-eCommerce-Website@2x.png',
    'https://cdn.prod.website-files.com/60e3eea63871951801a505d5/63d7ab46aa84b8c8f8c44649_fynd%20thumbnail.webp',
    'https://images.unsplash.com/photo-1467195468637-72eb862bb14e?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://devrix.com/wp-content/uploads/2020/06/How-to-Quickly-Build-an-eCommerce-Website@2x.png',
  ];
  const nextSlider = () =>
    setCurrentSlider((currentSlider) =>
      currentSlider === sliders.length - 1 ? 0 : currentSlider + 1,
    );
  useEffect(() => {
    //   const intervalId = setInterval(() => {
    //   nextSlider();
    // }, 3000);
    //   return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSlider]);

  return (
    <div className='mx-auto h-[240px] w-full overflow-hidden md:h-[540px]'>
      <div className='relative overflow-hidden'>
        {/* dots */}
        <div className='absolute bottom-1/2 right-0 z-50 flex h-fit w-fit rotate-90 gap-1 rounded-full'>
          {sliders.map((_, inx) => (
            <button
              key={inx}
              onClick={() => setCurrentSlider(inx)}
              className={`rounded-full bg-orange-500 duration-300 ${currentSlider === inx ? 'w-10' : 'w-2'} h-2`}
            ></button>
          ))}
        </div>
        {/* slider container */}
        <div
          className='relative flex h-60 transform-gpu flex-col duration-300 ease-linear sm:h-96 md:h-[540px]'
          style={{ transform: `translateY(-${currentSlider * 100}%)` }}
        >
          {/* sliders */}
          {sliders.map((_, inx) => (
            <div
              key={inx}
              className="relative min-w-full duration-200 before:absolute before:inset-0 before:-z-10 before:flex before:items-center before:justify-center before:bg-black/20 before:text-3xl before:text-black/40 before:content-['Image']"
            >
              <img
                src={_}
                className='h-60 w-full object-cover sm:h-96 md:h-[540px]'
                alt={`Slider - ${inx + 1}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
