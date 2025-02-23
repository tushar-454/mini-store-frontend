'use client';

import { useDeleteCouponMutation, useGetCouponsQuery } from '@/api/coupon';
import TableSkeleton from '@/components/dashboard/table_skeleton';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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
import { formatDate, removeLocalStorage } from '@/lib/utils';
import { signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';

const tableHeadData = [
  'No',
  'Code',
  'Type',
  'Discount',
  'Quantity',
  'Minimum Amount',
  'Start Date',
  'Expiry Date',
  'Actions',
];

const Coupons = () => {
  const [deletedId, setDeletedId] = useState('');
  const [showModal, setShowModal] = useState(false);
  const { toast } = useToast();
  const { data: { data: coupons } = {}, isError, isLoading, refetch } = useGetCouponsQuery();
  const [deleteCoupon, { isLoading: deleteCouponLoading }] = useDeleteCouponMutation();

  const handleDeleteCoupon = async (id: string) => {
    try {
      setShowModal(false);
      const { error } = await deleteCoupon(id);
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
            title: 'Coupon deletion failed',
          });
          return;
        }
      }
      toast({
        title: 'Coupon deleted',
      });
    } catch (error) {
      console.log('error in handleDeleteCoupon', error);
    }
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <>
      <div className='p-4'>
        <TypographyH4 className='mb-5'>Coupons</TypographyH4>
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
                {coupons?.map((coupon, index) => (
                  <TableRow key={index}>
                    <TableCell className='whitespace-nowrap p-4'>{index + 1}</TableCell>
                    <TableCell className='whitespace-nowrap p-4'>{coupon.code}</TableCell>
                    <TableCell className='whitespace-nowrap p-4'>{coupon.type}</TableCell>
                    <TableCell className='whitespace-nowrap p-4'>{coupon.discount}</TableCell>
                    <TableCell className='whitespace-nowrap p-4'>
                      {coupon.quantity === null ? 'Unlimited' : coupon.quantity}
                    </TableCell>
                    <TableCell className='whitespace-nowrap p-4'>{coupon.minprice || 0}</TableCell>
                    <TableCell className='whitespace-nowrap p-4'>
                      {formatDate(coupon.startAt)}
                    </TableCell>
                    <TableCell className='whitespace-nowrap p-4'>
                      {formatDate(coupon.expireAt)}
                    </TableCell>
                    <TableCell className='whitespace-nowrap p-4'>
                      <Badge className='mr-2 cursor-pointer'>Edit</Badge>
                      <Badge
                        variant={'destructive'}
                        onClick={() => {
                          setDeletedId(coupon._id);
                          setShowModal(true);
                        }}
                        className='cursor-pointer'
                      >
                        Delete
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className='text-left'>
              Are you sure, you want delete this item?
            </DialogTitle>
            <DialogDescription className='text-left'>
              <TypographyP className='flex items-center gap-2'>
                <span className='text-red-500'>Warning:</span> This action cannot be undone.
              </TypographyP>
              <div className='mt-4 flex gap-4'>
                <Button
                  variant='destructive'
                  onClick={() => !deleteCouponLoading && handleDeleteCoupon(deletedId)}
                  disabled={deleteCouponLoading}
                  loading={deleteCouponLoading}
                >
                  Delete
                </Button>
                <Button onClick={() => setShowModal(false)}>Cancel</Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Coupons;
