import { useEffect, useState } from 'react';
const Carousel = () => {
  const [currentSlider, setCurrentSlider] = useState(0);
  const sliders = [
    'https://i.ibb.co/r2H9ckW/2.webp',
    'https://i.ibb.co/0sV586w/5.webp',
    'https://i.ibb.co/RPyDs7Y/4.webp',
    'https://i.ibb.co/0hc77DN/1.webp',
    'https://i.ibb.co/4dVY5z2/3.webp',
  ];
  {
    const nextSlider = () =>
      setCurrentSlider((currentSlider) =>
        currentSlider === sliders.length - 1 ? 0 : currentSlider + 1,
      );
    useEffect(() => {
      const intervalId = setInterval(() => {
        nextSlider();
      }, 3000);
      return () => clearInterval(intervalId);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentSlider]);
  }
  return (
    <div
      data-aos='fade-down'
      className='mx-auto h-[240px] w-full overflow-hidden md:h-[540px]'
    >
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
