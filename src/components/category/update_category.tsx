'use client';

import { TCategory, TCategoryError, useUpdateCategoryMutation } from '@/api/category';
import { UploadImages } from '@/components/dashboard/upload_image';
import { ResetButton } from '@/components/generic_form/fields/ResetButton';
import { SubmitButton } from '@/components/generic_form/fields/SubmitButton';
import { TextField } from '@/components/generic_form/fields/TextField';
import { GenericForm, GenericFormRef } from '@/components/generic_form/generic_form';
import { TypographyH4 } from '@/components/ui/typography';
import { useToast } from '@/hooks/use-toast';
import { handleMultipleUpload, removeLocalStorage } from '@/lib/utils';
import { FormType, FormTypeUpdate, schemaUpdate } from '@/schema/create_categories';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

type CategoriesUpdateProps = {
  targetCategory: TCategory | undefined;
  updateId: string;
};

const CategoriesUpdate = ({ targetCategory, updateId }: CategoriesUpdateProps) => {
  const [initialValues] = useState<FormTypeUpdate>(targetCategory as FormTypeUpdate);
  const router = useRouter();
  const { toast } = useToast();
  const [updateCategory] = useUpdateCategoryMutation();
  const formRef = useRef<GenericFormRef<FormTypeUpdate>>(null);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [imageObjUrls, setImageObjUrls] = useState<string[]>([]);

  const handleSubmit = async (formData: FormTypeUpdate | React.FormEvent<HTMLFormElement>) => {
    const { name } = formData as FormType;
    try {
      setLoading(true);
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
      const categoryBody = {
        name,
        photo: Array.isArray(imagesUrls) && imagesUrls[0] ? imagesUrls[0] : targetCategory?.photo,
      };
      const result = await updateCategory({ _id: updateId, ...categoryBody });
      if ('error' in result) {
        const error = result.error as TCategoryError;
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
            title: 'Category Update',
            description: 'You have successfully update category',
          });
          formRef.current?.reset();
          router.push('/dashboard/categories');
        }
      }
    } catch (error) {
      setLoading(false);
      console.log('create category error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setImageObjUrls([targetCategory?.photo as string]);
  }, [targetCategory]);

  return (
    <div className='p-4'>
      <TypographyH4 className='mb-5'>Update Category</TypographyH4>
      <GenericForm
        schema={schemaUpdate}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        ref={formRef}
      >
        <div className='space-y-2'>
          <TextField name='name' label='name' placeholder='enter your category name ... ' />
          <UploadImages
            imageObjUrls={imageObjUrls}
            setImageObjUrls={setImageObjUrls}
            images={images}
            setImages={setImages}
          />
          <div className='flex items-center gap-2 pt-5'>
            <SubmitButton
              width='auto'
              label='Update Category'
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

export default CategoriesUpdate;
