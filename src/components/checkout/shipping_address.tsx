'use client';

import { DDType, DISTRICTS, DIVISIONS, UPAZILLAS } from '@/constant/location';
import { useToast } from '@/hooks/use-toast';
import { addLocalStorage, getLocalStorage, removeLocalStorage } from '@/lib/utils';
import { clearAddress, updateOrderAddress } from '@/store/features/order';
import { AppDispatch } from '@/store/store';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { z } from 'zod';
import { ResetButton } from '../generic_form/fields/ResetButton';
import { SelectField } from '../generic_form/fields/SelectField';
import { SubmitButton } from '../generic_form/fields/SubmitButton';
import { TextAreaField } from '../generic_form/fields/TextAreaField';
import { TextField } from '../generic_form/fields/TextField';
import { GenericForm, GenericFormRef } from '../generic_form/generic_form';
import Gradient from '../ui/gradient';
import { TypographyH4 } from '../ui/typography';

const FormSchema = z.object({
  name: z.string().nonempty(),
  email: z.string().email(),
  phone: z.string().nonempty(),
  division: z.string().nonempty(),
  district: z.string().nonempty(),
  sub_district: z.string().nonempty(),
  address: z.string().nonempty(),
});

type FormType = z.infer<typeof FormSchema>;

const initialValues: FormType = {
  name: '',
  email: '',
  phone: '',
  division: '',
  district: '',
  sub_district: '',
  address: '',
};

const ShippingAddress = () => {
  const { toast } = useToast();
  const dispatch = useDispatch<AppDispatch>();
  const formRef = useRef<GenericFormRef<FormType>>(null);
  const [division, setDivision] = useState('');
  const [district, setDistrict] = useState('');
  const [subDistricts, setSubDistricts] = useState<DDType>([]);
  const [districts, setDistricts] = useState<DDType>([]);

  useEffect(() => {
    const address = getLocalStorage('address');
    const validatedAddress = address ? FormSchema.safeParse(address) : null;
    if (validatedAddress?.success) {
      dispatch(updateOrderAddress(validatedAddress));
      const { name, email, phone, district, division, sub_district, address } =
        validatedAddress?.data;
      formRef.current?.form.setValue('name', name);
      formRef.current?.form.setValue('email', email);
      formRef.current?.form.setValue('phone', phone);
      formRef.current?.form.setValue('division', division);
      formRef.current?.form.setValue('district', district);
      formRef.current?.form.setValue('sub_district', sub_district);
      formRef.current?.form.setValue('address', address);
      setDivision(division);
      setDistrict(district);
    }
  }, [district, division, dispatch]);

  useEffect(() => {
    if (!formRef.current) return;
    const subscription = formRef.current.form.watch((values) => {
      if (values.division !== division) {
        formRef.current?.form.clearErrors('division');
        setDivision(values.division || '');
        formRef.current?.form.setValue('district', '');
      }
      if (values.district !== district) {
        formRef.current?.form.clearErrors('district');
        setDistrict(values.district || '');
        formRef.current?.form.setValue('sub_district', '');
      }
    });

    return () => subscription.unsubscribe();
  }, [division, district]);

  useEffect(() => {
    if (division) {
      setDistricts(DISTRICTS[division] || []);
    }
  }, [division]);

  useEffect(() => {
    if (district) {
      setSubDistricts(UPAZILLAS[district] || []);
    }
  }, [district]);

  const handleSubmit = (data: FormType | React.FormEvent<HTMLFormElement>) => {
    dispatch(updateOrderAddress(data));
    addLocalStorage('address', data);
    toast({
      title: 'Success',
      description: 'Shipping address saved successfully',
    });
    window.scrollTo(0, 0);
  };

  return (
    <div className='space-y-2'>
      <TypographyH4>
        <Gradient>Shipping Address</Gradient>
      </TypographyH4>
      <GenericForm
        schema={FormSchema}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        ref={formRef}
      >
        <div className='space-y-2'>
          <TextField
            name='name'
            label='Full Name'
            placeholder='Enter your full name here...'
            required
          />
          <TextField name='email' label='Email' placeholder=' Enter your email here... ' required />
          <TextField
            name='phone'
            label='Phone Number'
            placeholder=' Enter your phone number here... '
            required
          />
          <div className='grid grid-cols-1 gap-2 md:grid-cols-3'>
            <SelectField name='division' label='Division' options={DIVISIONS} required />
            <SelectField name='district' label='District' options={districts} required />
            <SelectField name='sub_district' label='Sub District' options={subDistricts} required />
          </div>
          <TextAreaField
            name='address'
            label='Full Address'
            placeholder=' Enter your full address here... '
            autoResize
            required
          />
          <div className='flex items-center gap-2 pt-5'>
            <SubmitButton width='auto' />
            <ResetButton
              cFunc={() => {
                dispatch(clearAddress());
                removeLocalStorage('address');
              }}
            />
          </div>
        </div>
      </GenericForm>
    </div>
  );
};

export { ShippingAddress };
