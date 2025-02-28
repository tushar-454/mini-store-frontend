'use client';

import { useCategoryQuery } from '@/api/category';
import { TProductError, useCreateProductMutation } from '@/api/product';
import { UploadImages } from '@/components/dashboard/upload_image';
import { VariantInput } from '@/components/dashboard/variant_input';
import { FieldArray } from '@/components/generic_form/field_array';
import { ResetButton } from '@/components/generic_form/fields/ResetButton';
import { SelectField } from '@/components/generic_form/fields/SelectField';
import { SubmitButton } from '@/components/generic_form/fields/SubmitButton';
import { TextAreaField } from '@/components/generic_form/fields/TextAreaField';
import { TextField } from '@/components/generic_form/fields/TextField';
import { GenericForm, GenericFormRef } from '@/components/generic_form/generic_form';
import { Button } from '@/components/ui/button';
import { TypographyH4 } from '@/components/ui/typography';
import { useToast } from '@/hooks/use-toast';
import { revalidateCakes } from '@/lib/actions';
import { handleMultipleUpload, removeLocalStorage } from '@/lib/utils';
import { FormType, schema } from '@/schema/create_product';
import DOMPurify from 'dompurify';
import { PlusCircle } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { useRef, useState } from 'react';

const initialValues: FormType = {
  name: '',
  description: '',
  price: 0,
  discount: 0,
  category: '',
  variants: [
    {
      name: '',
      price: 0,
    },
  ],
};

const ProductCreate = () => {
  const { toast } = useToast();
  const { data: { data: categories } = {} } = useCategoryQuery();
  const [createProduct] = useCreateProductMutation();
  const formRef = useRef<GenericFormRef<FormType>>(null);
  const [images, setImages] = useState<File[]>([]);
  const [imageObjUrls, setImageObjUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const categoryOptions = categories?.map((category) => ({
    value: category.name,
    text: category.name,
  }));

  const handleSubmit = async (formData: FormType | React.FormEvent<HTMLFormElement>) => {
    try {
      setLoading(true);
      if (images.length === 0) {
        toast({
          variant: 'destructive',
          title: 'Please upload an image',
          description: 'You need to upload at least one image',
        });
        setLoading(false);
        return;
      }
      const imagesUrls = await handleMultipleUpload(images);
      let cleanContent = '';
      if ('description' in formData) {
        cleanContent = formData.description;
      }
      const result = await createProduct({
        ...formData,
        description: DOMPurify.sanitize(cleanContent, {
          ALLOWED_TAGS: ['iframe'],
          ALLOWED_ATTR: ['src', 'width', 'height', 'allow', 'allowfullscreen'],
        }),
        images: imagesUrls,
      });

      if ('error' in result) {
        const error = result.error as TProductError;
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
            description: `${error.data.errors.map((err) => err.field).join(', ')} are required`,
          });
          setLoading(false);
        }
      } else {
        const { data } = result;
        if (data.success) {
          toast({
            title: 'Product created successfully',
          });
          formRef.current?.reset();
          setLoading(false);
          setImages([]);
          revalidateCakes('/products/' + data.data.slug);
        }
      }
    } catch (error) {
      setLoading(false);
      console.log('Error creating product', error);
    }
  };

  return (
    <div className='p-4'>
      <TypographyH4 className='mb-5'>Create a new Product</TypographyH4>
      <GenericForm
        schema={schema}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        ref={formRef}
      >
        <div className='space-y-2'>
          <TextField name='name' label='Name' required />
          <TextAreaField name='description' label='Description' autoResize required />
          <TextField name='price' label='Price' type='number' required />
          <TextField name='discount' label='Discount' type='number' required />
          <SelectField<FormType>
            name='category'
            label='Category'
            options={categoryOptions || []}
            required
          />
          <UploadImages
            imageObjUrls={imageObjUrls}
            setImageObjUrls={setImageObjUrls}
            images={images}
            setImages={setImages}
          />
          <FieldArray<FormType> name='variants'>
            {({ fields, append, remove }) => (
              <div className='space-y-2'>
                {/* Variant Cards */}
                {fields.map((field, index) => (
                  <VariantInput key={field.id} index={index} onRemove={() => remove(index)} />
                ))}
                {/* Add Variant Button */}
                <div className='flex items-center justify-end'>
                  <Button
                    onClick={() =>
                      append({
                        name: '',
                        price: 0,
                      })
                    }
                    type='button'
                    variant='outline'
                  >
                    <div className='flex items-center gap-2'>
                      <PlusCircle className='h-6 w-6' />
                      <span>Add Variant</span>
                    </div>
                  </Button>
                </div>
              </div>
            )}
          </FieldArray>
          <div className='flex items-center gap-2 pt-5'>
            <SubmitButton
              width='auto'
              label='Create Product'
              loading={loading}
              disabled={loading}
            />
            <ResetButton
              cFunc={() => {
                setImageObjUrls([]);
                setImages([]);
              }}
            />
          </div>
        </div>
      </GenericForm>
    </div>
  );
};

export default ProductCreate;
