import { TReviewError, useCreateReviewMutation } from '@/api/reviews';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { removeLocalStorage } from '@/lib/utils';
import { FormType, schema } from '@/schema/create-review';
import { signOut } from 'next-auth/react';
import React, { useRef, useState } from 'react';
import { ResetButton } from '../generic_form/fields/ResetButton';
import { SubmitButton } from '../generic_form/fields/SubmitButton';
import { TextAreaField } from '../generic_form/fields/TextAreaField';
import { TextField } from '../generic_form/fields/TextField';
import { GenericForm, GenericFormRef } from '../generic_form/generic_form';

type CreateReviewProps = {
  orderId: string;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: () => void;
};

const initialValues: FormType = {
  rating: 0,
  comment: '',
};

const CreateReview = ({ orderId, showModal, setShowModal, refetch }: CreateReviewProps) => {
  const { toast } = useToast();
  const [createReview] = useCreateReviewMutation();
  const formRef = useRef<GenericFormRef<FormType>>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData: FormType | React.FormEvent<HTMLFormElement>) => {
    const { comment, rating } = formData as FormType;
    try {
      setLoading(true);
      const result = await createReview({ orderId, comment, rating });
      if ('error' in result) {
        const error = result.error as TReviewError;
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
        } else if (error.status === 400 && 'error' in error.data) {
          toast({
            variant: 'destructive',
            title: error.data.error,
          });
          setLoading(false);
        }
      } else {
        const { data } = result;
        if (data.success) {
          toast({
            title: 'Review created successfully',
            description: 'You have successfully created a new Review',
          });
          refetch();
          formRef.current?.reset();
          setShowModal(false);
          setLoading(false);
        }
      }
    } catch (error) {
      setLoading(false);
      console.log('create review error:', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='text-left'>Please Review Your Order</DialogTitle>
          <DialogDescription className='text-left'>
            <GenericForm
              schema={schema}
              initialValues={initialValues}
              onSubmit={handleSubmit}
              ref={formRef}
            >
              <div className='space-y-2'>
                <TextField<FormType>
                  name='rating'
                  label='Rating'
                  placeholder='4.5'
                  className='w-full'
                  required
                />
                <TextAreaField<FormType>
                  name='comment'
                  label='Comment'
                  placeholder='Write your review here'
                  className='w-full'
                  required
                  autoResize
                />
                <div className='flex items-center gap-2 pt-5'>
                  <SubmitButton
                    width='auto'
                    label='Create Review'
                    loading={loading}
                    disabled={loading}
                  />
                  <ResetButton />
                </div>
              </div>
            </GenericForm>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CreateReview;
