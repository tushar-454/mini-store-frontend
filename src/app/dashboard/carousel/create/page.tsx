'use client';

import { TCarouselError, useCreateCarouselMutation } from '@/api/carousel';
import { UploadImages } from '@/components/dashboard/upload_image';
import { ResetButton } from '@/components/generic_form/fields/ResetButton';
import { SubmitButton } from '@/components/generic_form/fields/SubmitButton';
import { GenericForm, GenericFormRef } from '@/components/generic_form/generic_form';
import { TypographyH4 } from '@/components/ui/typography';
import { useToast } from '@/hooks/use-toast';
import { handleMultipleUpload, removeLocalStorage } from '@/lib/utils';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { z } from 'zod';

const schema = z.object({});
type FormData = z.infer<typeof schema>;

const CarouselCreate = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [createCarousel] = useCreateCarouselMutation();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [imageObjUrls, setImageObjUrls] = useState<string[]>([]);
  const formRef = useRef<GenericFormRef<FormData>>(null);

  const handleSubmit = async (formData: FormData | React.FormEvent<HTMLFormElement>) => {
    if (formData) {
    }
    try {
      setLoading(true);
      if (images.length === 0) {
        toast({
          variant: 'destructive',
          title: 'Please upload an image',
          description: 'You need to upload one image',
        });
        setLoading(false);
        return;
      }
      if (images.length > 1) {
        toast({
          variant: 'destructive',
          title: 'Please upload only one image',
          description: 'You need to upload only one image',
        });
        setLoading(false);
        return;
      }
      const imagesUrls = await handleMultipleUpload(images);
      const result = await createCarousel({ image: imagesUrls ? imagesUrls[0] : '' });
      if ('error' in result) {
        const error = result.error as TCarouselError;
        if (error.status === 403) {
          toast({
            variant: 'destructive',
            title: 'You are not authorized. Token expired',
            description: 'Please login again.',
          });
          setTimeout(() => {
            removeLocalStorage('isLogin');
            signOut();
          }, 2000);
          setLoading(false);
        } else if (error.status === 400 && 'errors' in error.data) {
          toast({
            variant: 'destructive',
            title: 'You have missed some fields',
            description: `${error.data.errors.map((err) => `${err.field} - ${err.message}`).join(', ')}`,
          });
          setLoading(false);
        }
      } else {
        const { data } = result;
        if (data.success) {
          toast({
            title: 'Carousel item created successfully',
            description: 'You have successfully created a new carousel item',
          });
          router.push('/dashboard/carousel');
        }
      }
    } catch (error) {
      setLoading(false);
      console.log('create carousel error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='p-4'>
      <TypographyH4 className='mb-5'>Create a new Carousel Item</TypographyH4>
      <GenericForm schema={schema} initialValues={{}} onSubmit={handleSubmit} ref={formRef}>
        <div className='space-y-2'>
          <UploadImages
            imageObjUrls={imageObjUrls}
            setImageObjUrls={setImageObjUrls}
            images={images}
            setImages={setImages}
            isRestrictedAspectRatio
            customWidth={16}
            customHeight={9}
          />
          <div className='flex items-center gap-2 pt-5'>
            <SubmitButton
              width='auto'
              label='Create Carousel'
              loading={loading}
              disabled={loading}
            />
            <ResetButton />
          </div>
        </div>
      </GenericForm>
    </div>
  );
};

export default CarouselCreate;
