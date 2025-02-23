'use client';

import {
  TProduct,
  useDeleteProductMutation,
  useGetProductsQuery,
  useUpdateProductMutation,
} from '@/api/product';
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
import { revalidateCakes, revalidateFeaturedCakes } from '@/lib/actions';
import { removeLocalStorage } from '@/lib/utils';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';

const tableHeadData = [
  'No',
  'Name',
  'Price',
  'Discount',
  'Rating',
  'Sells',
  'Featured',
  'Upcoming',
  'Deleted',
  'Actions',
];

const Products = () => {
  const [deletedId, setDeletedId] = useState('');
  const [showModal, setShowModal] = useState(false);
  const { toast } = useToast();
  const { data: { data: cakes } = {}, isError, isLoading } = useGetProductsQuery();
  const [deleteProduct, { isLoading: deleteProductLoading }] = useDeleteProductMutation();
  const [updateProduct] = useUpdateProductMutation();

  const handleProductSwitchUpdate = async (id: string, body: Partial<TProduct>) => {
    try {
      const { error } = await updateProduct({ id, body });
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
            title: 'Product update failed',
          });
          return;
        }
      }
      revalidateFeaturedCakes();
    } catch (error) {
      console.log('error in handleUpdateProduct', error);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      setShowModal(false);
      const { error } = await deleteProduct(id);
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
            title: 'Product deletion failed',
          });
          return;
        }
      }
      toast({
        title: 'Product deleted',
      });
      revalidateCakes();
    } catch (error) {
      console.log('error in handleDeleteProduct', error);
    }
  };

  return (
    <>
      <div className='p-4'>
        <TypographyH4 className='mb-5'>Products</TypographyH4>
        <div className='w-full overflow-hidden'>
          {isLoading && <TableSkeleton height='h-8' />}
          {isError && (
            <TypographyP className='text-center text-red-500'>
              Something is wrong while fetching products. Maybe your token is expired. Please login
              again.
            </TypographyP>
          )}
          {!isLoading && !isError && (
            <Table className='min-w-[1024px] overflow-x-auto'>
              <TableHeader>
                <TableRow>
                  {tableHeadData?.map((head, index) => <TableHead key={index}>{head}</TableHead>)}
                </TableRow>
              </TableHeader>
              <TableBody>
                {cakes?.map((cake, index) => (
                  <TableRow key={index}>
                    <TableCell className='whitespace-nowrap p-4'>{index + 1}</TableCell>
                    <TableCell className='whitespace-nowrap p-4'>
                      <Link href={`/products/${cake.slug}`} className='hover:underline'>
                        {cake.name}
                      </Link>
                    </TableCell>
                    <TableCell className='whitespace-nowrap p-4'>{cake.price}</TableCell>
                    <TableCell className='whitespace-nowrap p-4'>{cake.discount}</TableCell>
                    <TableCell className='whitespace-nowrap p-4'>{cake.rating}</TableCell>
                    <TableCell className='whitespace-nowrap p-4'>{cake.sell_count}</TableCell>
                    <TableCell className='whitespace-nowrap p-4'>
                      <Switch
                        onCheckedChange={(value) => {
                          handleProductSwitchUpdate(cake._id, { is_featured: value });
                        }}
                        checked={cake.is_featured}
                      />
                    </TableCell>
                    <TableCell className='whitespace-nowrap p-4'>
                      <Switch
                        onCheckedChange={(value) => {
                          handleProductSwitchUpdate(cake._id, { is_upcoming: value });
                        }}
                        checked={cake.is_upcoming}
                      />
                    </TableCell>
                    <TableCell className='whitespace-nowrap p-4'>
                      <Switch
                        onCheckedChange={(value) => {
                          handleProductSwitchUpdate(cake._id, { is_deleted: value });
                        }}
                        checked={cake.is_deleted}
                      />
                    </TableCell>
                    <TableCell className='whitespace-nowrap p-4'>
                      <Badge className='mr-2 cursor-pointer'>Edit</Badge>
                      <Badge
                        variant={'destructive'}
                        onClick={() => {
                          setDeletedId(cake._id);
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
                  onClick={() => !deleteProductLoading && handleDeleteProduct(deletedId)}
                  disabled={deleteProductLoading}
                  loading={deleteProductLoading}
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

export default Products;
