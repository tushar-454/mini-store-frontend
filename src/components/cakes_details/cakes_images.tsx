'use client';
import { TProductsImages } from '@/api/product';
import { setSelectedImage } from '@/store/features/globalReducer';
import { AppDispatch, RootState } from '@/store/store';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';

type CakeImagesProps = {
  images: TProductsImages;
};

const CakesImages = ({ images }: CakeImagesProps) => {
  const selectedImage = useSelector((state: RootState) => state.global.selectedImage);
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div className='mb-8 w-full px-4 md:w-1/2'>
      <div className='h-[32rem] w-full 2xl:h-[40rem]'>
        <Image
          src={selectedImage}
          alt='Product preview main image'
          width={1080}
          height={720}
          className='mb-4 h-full w-full rounded-lg object-cover shadow-md hover:object-contain'
          quality={85}
          loading='lazy'
        />
      </div>
      <div className='flex justify-center gap-4 overflow-x-auto py-4'>
        {images?.map((image) => (
          <Image
            key={image}
            src={image}
            alt={image}
            width={200}
            height={200}
            quality={60}
            loading='lazy'
            className={`size-16 cursor-pointer rounded-md object-cover transition duration-300 hover:opacity-100 sm:size-20 ${image === selectedImage ? 'opacity-100' : 'opacity-60'}`}
            onClick={() => dispatch(setSelectedImage(image))}
          />
        ))}
      </div>
    </div>
  );
};

export { CakesImages };
