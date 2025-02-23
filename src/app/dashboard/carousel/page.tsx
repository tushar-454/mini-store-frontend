'use client';

import { useCarouselQuery, useDeleteCarouselMutation } from '@/api/carousel';
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
import { removeLocalStorage } from '@/lib/utils';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const tableHeadData = ['No', 'Image', 'Position', 'Actions'];

const Carousel = () => {
  const [deletedId, setDeletedId] = useState('');
  const [showModal, setShowModal] = useState(false);
  const { toast } = useToast();
  const { data: { data: carousel } = {}, isError, isLoading, refetch } = useCarouselQuery();
  const [deleteCarousel, { isLoading: deleteCarouselLoading }] = useDeleteCarouselMutation();

  const handleDeleteCarousel = async (id: string) => {
    try {
      setShowModal(false);
      const { error } = await deleteCarousel(id);
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
            title: 'Carousel item deletion failed',
          });
          return;
        }
      }
      toast({
        title: 'Carousel item deleted',
      });
    } catch (error) {
      console.log('error in handleDeleteCarousel', error);
    }
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <>
      <div className='p-4'>
        <TypographyH4 className='mb-5'>Carousel</TypographyH4>
        <div className='w-full overflow-hidden'>
          {isLoading && <TableSkeleton height='h-32' />}
          {isError && (
            <TypographyP className='text-center text-red-500'>
              Something is wrong while fetching carousel.
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
                {carousel?.map((item, index) => (
                  <TableRow key={item._id}>
                    <TableCell className='whitespace-nowrap p-4'>{index + 1}</TableCell>
                    <TableCell className='whitespace-nowrap p-4'>
                      <Image
                        src={item.image}
                        alt={item.title || 'carousel image'}
                        width={200}
                        height={100}
                        className='h-auto w-auto rounded-md'
                      />
                    </TableCell>
                    <TableCell className='whitespace-nowrap p-4' id='position'>
                      {index + 1}
                    </TableCell>
                    <TableCell className='whitespace-nowrap p-4'>
                      <Badge className='mr-2 cursor-pointer'>Edit</Badge>
                      <Badge
                        variant={'destructive'}
                        onClick={() => {
                          setDeletedId(item._id);
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
                  onClick={() => !deleteCarouselLoading && handleDeleteCarousel(deletedId)}
                  disabled={deleteCarouselLoading}
                  loading={deleteCarouselLoading}
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

export default Carousel;
