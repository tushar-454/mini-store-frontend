'use client';

import { useDeleteGalleryMutation, useGalleryQuery } from '@/api/gallery';
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

const tableHeadData = ['No', 'Image', 'Label', 'Width', 'Height', 'Actions'];

const Galleries = () => {
  const [deletedId, setDeletedId] = useState('');
  const [showModal, setShowModal] = useState(false);
  const { toast } = useToast();
  const { data: { data: gallery } = {}, isError, isLoading, refetch } = useGalleryQuery();
  const [deleteGallery, { isLoading: deleteGalleryLoading }] = useDeleteGalleryMutation();

  const handleDeleteGallery = async (id: string) => {
    try {
      setShowModal(false);
      const { error } = await deleteGallery(id);
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
            title: 'Gallery item deletion failed',
          });
          return;
        }
      }
      toast({
        title: 'Gallery item deleted',
      });
    } catch (error) {
      console.log('error in handleDeleteGallery', error);
    }
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <>
      <div className='p-4'>
        <TypographyH4 className='mb-5'>Galleries</TypographyH4>
        <div className='w-full overflow-hidden'>
          {isLoading && <TableSkeleton height='h-16' />}
          {isError && (
            <TypographyP className='text-center text-red-500'>
              Something is wrong while fetching gallery.
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
                {gallery?.map((item, index) => (
                  <TableRow key={item._id}>
                    <TableCell className='whitespace-nowrap p-4'>{index + 1}</TableCell>
                    <TableCell className='whitespace-nowrap p-4'>
                      <Image
                        src={item.src}
                        alt={item.label}
                        width={50}
                        height={50}
                        className='size-14 rounded-md'
                      />
                    </TableCell>
                    <TableCell className='whitespace-nowrap p-4'>{item.label}</TableCell>
                    <TableCell className='whitespace-nowrap p-4'>{item.width}</TableCell>
                    <TableCell className='whitespace-nowrap p-4'>{item.height}</TableCell>
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
                  onClick={() => !deleteGalleryLoading && handleDeleteGallery(deletedId)}
                  disabled={deleteGalleryLoading}
                  loading={deleteGalleryLoading}
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

export default Galleries;
