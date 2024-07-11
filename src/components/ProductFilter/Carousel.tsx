import { useCallback, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

export const Carousel = () => {
  const [currentSlider, setCurrentSlider] = useState(0);
  const carouselImages = [
    'https://images.unsplash.com/photo-1421789665209-c9b2a435e3dc?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1508873881324-c92a3fc536ba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1719749990914-a3ba54e6343f?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1467195468637-72eb862bb14e?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1532155297578-a43684be8db8?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  ];
  const prevSlider = () =>
    setCurrentSlider((currentSlider) =>
      currentSlider === 0 ? carouselImages.length - 1 : currentSlider - 1,
    );
  const nextSlider = useCallback(
    () =>
      setCurrentSlider((currentSlider) =>
        currentSlider === carouselImages.length - 1 ? 0 : currentSlider + 1,
      ),
    [carouselImages.length],
  );

  // if you don't want to change the slider automatically then you can just remove the useEffect
  {
    /*
    
  useEffect(() => {
    const intervalId = setInterval(() => {
      nextSlider();
    }, 3000);
    return () => clearInterval(intervalId);
  }, [nextSlider]);
 */
  }
  return (
    <div className='relative h-60 w-full overflow-hidden md:h-[470px] lg:h-[540px]'>
      <div className='absolute left-0 top-0 z-50 flex h-full w-full items-center justify-between px-4'>
        {/* arrow left */}
        <button
          onClick={prevSlider}
          className='grid h-6 w-6 place-items-center rounded-full bg-white md:h-8 md:w-8'
        >
          <FaChevronLeft />
        </button>
        {/* arrow right */}
        <button
          onClick={nextSlider}
          className='grid h-6 w-6 place-items-center rounded-full bg-white md:h-8 md:w-8'
        >
          <FaChevronRight />
        </button>
      </div>
      {/* Carousel container */}
      <div
        className='flex transform-gpu duration-500 ease-linear'
        style={{ transform: `translateX(-${currentSlider * 100}%)` }}
      >
        {/* sliders */}
        {carouselImages.map((slide, idx) => (
          <img
            key={slide}
            src={slide}
            className='h-60 min-w-full bg-black/20 object-cover sm:h-96 md:h-[540px]'
            alt={`Slider - ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
