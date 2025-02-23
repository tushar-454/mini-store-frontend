'use client';

import { TReview, useAllReviewsQuery, useUpdateReviewMutation } from '@/api/reviews';
import TableSkeleton from '@/components/dashboard/table_skeleton';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Switch } from '@/components/ui/switch';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { TypographyH4, TypographyP } from '@/components/ui/typography';
import { useToast } from '@/hooks/use-toast';
import { removeLocalStorage } from '@/lib/utils';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import { useEffect } from 'react';

const tableHeadData = ['No', 'Photo', 'Name', 'Email', 'Comment', 'Deleted'];

const Reviews = () => {
  const { toast } = useToast();
  const [updateReview] = useUpdateReviewMutation();
  const { data: { data: reviews } = {}, isError, isLoading, refetch } = useAllReviewsQuery();

  const handleReviewSwitchUpdate = async (id: string, body: Partial<TReview>) => {
    try {
      const { error } = await updateReview({ _id: id, ...body });
      if (error && 'status' in error) {
        if (Number(error?.status) === 403) {
          toast({
            variant: 'destructive',
            title: 'Token expired. Please login again',
          });
          setTimeout(() => {
            removeLocalStorage('isLogin');
            signOut();
          }, 2000);
          return;
        }
        if (Number(error?.status) === 400) {
          toast({
            variant: 'destructive',
            title: 'review update failed',
          });
          return;
        }
      }
    } catch (error) {
      console.log('error in handleUpdateReview', error);
    }
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <>
      <div className='p-4'>
        <TypographyH4 className='mb-5'>Reviews</TypographyH4>
        <div className='w-full overflow-hidden'>
          {isLoading && <TableSkeleton height='h-8' />}
          {isError && (
            <TypographyP className='text-center text-red-500'>
              Something is wrong while fetching coupons. Maybe your token is expired. Please login
              again.
            </TypographyP>
          )}
          {!isLoading && !isError && (
            <Table className='min-w-[1024px] overflow-x-auto'>
              <TableHeader>
                <TableRow>
                  {tableHeadData?.map((head, index) => (
                    <TableHead key={index} className='whitespace-nowrap'>
                      {head}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {reviews?.map((review, index) => (
                  <TableRow key={index}>
                    <TableCell className='whitespace-nowrap p-4'>{index + 1}</TableCell>
                    <TableCell className='whitespace-nowrap p-4'>
                      <Image
                        src={review.photo}
                        alt={review.name}
                        width={50}
                        height={50}
                        className='size-10 min-w-10 cursor-pointer rounded-full object-cover'
                      />
                    </TableCell>
                    <TableCell className='whitespace-nowrap p-4'>{review.name}</TableCell>
                    <TableCell className='whitespace-nowrap p-4'>{review.email}</TableCell>
                    <TableCell className='p-4'>
                      <HoverCard>
                        <HoverCardTrigger>{review.comment.slice(0, 30) + '...'}</HoverCardTrigger>
                        <HoverCardContent>{review.comment}</HoverCardContent>
                      </HoverCard>
                    </TableCell>
                    <TableCell className='whitespace-nowrap p-4'>
                      <Switch
                        onCheckedChange={(value) => {
                          handleReviewSwitchUpdate(review._id, { is_deleted: value });
                        }}
                        checked={review.is_deleted}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </>
  );
};

export default Reviews;
