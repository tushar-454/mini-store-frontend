'use client';

import { TCouponError, useCreateCouponMutation } from '@/api/coupon';
import { DateTimeField } from '@/components/generic_form/fields/DateTimeField';
import { ResetButton } from '@/components/generic_form/fields/ResetButton';
import { SelectField } from '@/components/generic_form/fields/SelectField';
import { SubmitButton } from '@/components/generic_form/fields/SubmitButton';
import { TextField } from '@/components/generic_form/fields/TextField';
import { GenericForm, GenericFormRef } from '@/components/generic_form/generic_form';
import { TypographyH4 } from '@/components/ui/typography';
import { useToast } from '@/hooks/use-toast';
import { removeLocalStorage } from '@/lib/utils';
import { FormType, schema } from '@/schema/create_coupon';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

const initialValues: FormType = {
  code: '',
  type: 'flat',
  discount: 0,
  quantity: 0,
  minprice: 0,
  startAt: new Date(),
  expireAt: new Date(),
};

const CouponCreate = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [createCoupon] = useCreateCouponMutation();
  const formRef = useRef<GenericFormRef<FormType>>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData: FormType | React.FormEvent<HTMLFormElement>) => {
    const { code, type, discount, quantity, minprice, startAt, expireAt } = formData as FormType;
    const couponBody = {
      code,
      type,
      discount,
      quantity,
      minprice,
      startAt: startAt?.toISOString(),
      expireAt: expireAt.toISOString(),
    };
    try {
      setLoading(true);
      const result = await createCoupon(couponBody);
      if ('error' in result) {
        const error = result.error as TCouponError;
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
            title: 'Coupon created successfully',
            description: 'You have successfully created a new coupon',
          });
          formRef.current?.reset();
          router.push('/dashboard/coupon');
        }
      }
    } catch (error) {
      setLoading(false);
      console.log('create coupon error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='p-4'>
      <TypographyH4 className='mb-5'>Create a new coupon</TypographyH4>
      <GenericForm
        schema={schema}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        ref={formRef}
      >
        <div className='space-y-2'>
          <TextField name='code' label='Code' placeholder='enter your code ... ' required />
          <SelectField
            name='type'
            label='Coupon Type'
            options={[
              { value: 'percentage', text: 'Percentage' },
              { value: 'flat', text: 'Flat' },
            ]}
            required
          />
          <TextField name='discount' label='Discount' type='number' required />
          <TextField name='quantity' label='Quantity' type='number' required />
          <TextField name='minprice' label='Minimum Price' type='number' required />
          <DateTimeField name='startAt' label='Start At' className='pt-2' required />
          <DateTimeField name='expireAt' label='Expire At' className='pt-2' required />
          <div className='flex items-center gap-2 pt-5'>
            <SubmitButton width='auto' label='Create Coupon' loading={loading} disabled={loading} />
            <ResetButton />
          </div>
        </div>
      </GenericForm>
    </div>
  );
};

export default CouponCreate;
