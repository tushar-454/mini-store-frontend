import { useToast } from '@/hooks/use-toast';
import { Plus, Trash } from 'lucide-react';
import Image from 'next/image';
import { useEffect } from 'react';
import { FormLabel } from '../ui/form';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

type UploadImagesProps = {
  imageObjUrls: string[];
  setImageObjUrls: React.Dispatch<React.SetStateAction<string[]>>;
  images: File[];
  setImages: React.Dispatch<React.SetStateAction<File[]>>;
  isRestrictedAspectRatio?: boolean;
  customWidth?: number;
  customHeight?: number;
};

const UploadImages = ({
  imageObjUrls,
  setImageObjUrls,
  images,
  setImages,
  isRestrictedAspectRatio = false,
  customWidth = 1,
  customHeight = 1,
}: UploadImagesProps) => {
  const { toast } = useToast();
  const handleDelete = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files || [];
    const validFiles: File[] = [];

    if (isRestrictedAspectRatio) {
      if (files.length > 0) {
        const processFilePromises = Array.from(files).map((file) => {
          return new Promise<void>((resolve) => {
            const reader = new FileReader();

            reader.onload = (readerEvent) => {
              const img = new window.Image();

              img.onload = () => {
                const width = img.width;
                const height = img.height;
                const aspectRatio = width / height;

                if (aspectRatio !== customWidth / customHeight) {
                  toast({
                    variant: 'destructive',
                    title: 'Invalid aspect ratio',
                    description: `Image must have a ${customWidth}:${customHeight} aspect ratio`,
                  });
                } else {
                  validFiles.push(file);
                }
                resolve();
              };
              img.src = readerEvent?.target?.result as string;
            };

            reader.readAsDataURL(file);
          });
        });
        Promise.all(processFilePromises).then(() => {
          setImages((prevImages) => [...prevImages, ...validFiles]);
        });
      }
      return;
    }
    setImages((prevImages) => [...prevImages, ...Array.from(files)]);
  };

  useEffect(() => {
    const objUrlImages = images.map((file) => {
      return URL.createObjectURL(file);
    });
    setImageObjUrls(objUrlImages);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images]);

  return (
    <div>
      <FormLabel htmlFor='images'>Upload Images</FormLabel>
      <Input
        id='imagesInput'
        type='file'
        onChange={(e) => handleImageChange(e)}
        className='hidden'
        multiple
      />
      <div className='flex flex-wrap items-center gap-2'>
        {imageObjUrls.map((objUrl, index) => (
          <div key={index} className='relative'>
            <span className='absolute right-1 top-1 select-none'>
              <Trash
                size={24}
                onClick={() => handleDelete(index)}
                className='cursor-pointer select-none rounded-lg bg-neutral-200 p-1 text-neutral-500 transition-all hover:bg-neutral-300/80'
              />
            </span>
            <Image
              src={objUrl}
              alt='image'
              width={300}
              height={300}
              className='h-20 w-20 select-none rounded-lg object-cover'
            />
          </div>
        ))}
        <Label htmlFor='imagesInput'>
          <Plus
            size={80}
            className='my-2 cursor-pointer rounded-lg bg-neutral-200 p-2 text-neutral-500 transition-all hover:bg-neutral-300/80'
          />
        </Label>
      </div>
    </div>
  );
};

export { UploadImages };
