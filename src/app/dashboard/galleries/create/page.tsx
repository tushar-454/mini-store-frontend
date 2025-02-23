'use client';

import { TGalleryError, useCreateGalleryMutation } from '@/api/gallery';
import { UploadImages } from '@/components/dashboard/upload_image';
import { ResetButton } from '@/components/generic_form/fields/ResetButton';
import { SubmitButton } from '@/components/generic_form/fields/SubmitButton';
import { TextField } from '@/components/generic_form/fields/TextField';
import { GenericForm, GenericFormRef } from '@/components/generic_form/generic_form';
import { TypographyH4 } from '@/components/ui/typography';
import { useToast } from '@/hooks/use-toast';
import { handleMultipleUpload, removeLocalStorage } from '@/lib/utils';
import { FormType, schema } from '@/schema/create_gallery';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

const initialValues: FormType = {
  label: '',
  width: 0,
  height: 0,
};

const GalleryCreate = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [createGallery] = useCreateGalleryMutation();
  const formRef = useRef<GenericFormRef<FormType>>(null);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [imageObjUrls, setImageObjUrls] = useState<string[]>([]);

  const handleSubmit = async (formData: FormType | React.FormEvent<HTMLFormElement>) => {
    const { label, width, height } = formData as FormType;
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
      const galleryBody = {
        src: Array.isArray(imagesUrls) && imagesUrls[0],
        width,
        height,
        label,
      };

      const result = await createGallery(galleryBody);
      if ('error' in result) {
        const error = result.error as TGalleryError;
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
            title: 'Gallery item created successfully',
            description: 'You have successfully created a new gallery item',
          });
          formRef.current?.reset();
          router.push('/dashboard/galleries');
        }
      }
    } catch (error) {
      setLoading(false);
      console.log('create gallery error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='p-4'>
      <TypographyH4 className='mb-5'>Create a new Gallery Item</TypographyH4>
      <GenericForm
        schema={schema}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        ref={formRef}
      >
        <div className='space-y-2'>
          <TextField name='label' label='label' placeholder='enter your label name ... ' required />
          <TextField name='width' label='width' placeholder='enter your width ... ' required />
          <TextField name='height' label='height' placeholder='enter your height ... ' required />
          <UploadImages
            imageObjUrls={imageObjUrls}
            setImageObjUrls={setImageObjUrls}
            images={images}
            setImages={setImages}
          />
          <div className='flex items-center gap-2 pt-5'>
            <SubmitButton
              width='auto'
              label='Create Gallery'
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

export default GalleryCreate;
