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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
import { useEffect, useState } from 'react';

const tableHeadData = [
  'No',
  'Name',
  'Price',
  'Discount',
  'Rating',
  'Sells',
  'Stock',
  'Featured',
  'Upcoming',
  'Deleted',
  'Actions',
];

const Products = () => {
  const [deletedId, setDeletedId] = useState('');
  const [showModal, setShowModal] = useState(false);
  const { toast } = useToast();
  const [sortType, setSortType] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [filter, setFilter] = useState('');
  const { data: { data: products } = {}, isError, isLoading } = useGetProductsQuery();
  const [deleteProduct, { isLoading: deleteProductLoading }] = useDeleteProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [sortedProducts, setSortedProducts] = useState<TProduct[]>([]);

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

  useEffect(() => {
    if (products) {
      setSortedProducts(products);
    }
    if (products && sortType && sortOrder) {
      const sorted = [...products].sort((a, b) => {
        if (sortOrder === 'asc') {
          if (sortType === 'price') {
            return a.price - b.price;
          }
          if (sortType === 'discount') {
            return a.discount - b.discount;
          }
          if (sortType === 'rating') {
            return a.rating - b.rating;
          }
          if (sortType === 'sells') {
            return a.sell_count - b.sell_count;
          }
        }
        if (sortOrder === 'desc') {
          if (sortType === 'price') {
            return b.price - a.price;
          }
          if (sortType === 'discount') {
            return b.discount - a.discount;
          }
          if (sortType === 'rating') {
            return b.rating - a.rating;
          }
          if (sortType === 'sells') {
            return b.sell_count - a.sell_count;
          }
        }
        return 0;
      });
      setSortedProducts(sorted);
    }
    if (products && filter) {
      const filtered = products.filter((product) => {
        if (filter === 'stock') {
          return product.stock;
        }
        if (filter === 'out_of_stock') {
          return !product.stock;
        }
        if (filter === 'featured') {
          return product.is_featured;
        }
        if (filter === 'not_featured') {
          return !product.is_featured;
        }
        if (filter === 'upcoming') {
          return product.is_upcoming;
        }
        if (filter === 'not_upcoming') {
          return !product.is_upcoming;
        }
        if (filter === 'deleted') {
          return product.is_deleted;
        }
        if (filter === 'not_deleted') {
          return !product.is_deleted;
        }
        return product;
      });
      setSortedProducts(filtered);
    }
    if (products && sortType && sortOrder && filter) {
      const sorted = [...products].sort((a, b) => {
        if (sortOrder === 'asc') {
          if (sortType === 'price') {
            return a.price - b.price;
          }
          if (sortType === 'discount') {
            return a.discount - b.discount;
          }
          if (sortType === 'rating') {
            return a.rating - b.rating;
          }
          if (sortType === 'sells') {
            return a.sell_count - b.sell_count;
          }
        }
        if (sortOrder === 'desc') {
          if (sortType === 'price') {
            return b.price - a.price;
          }
          if (sortType === 'discount') {
            return b.discount - a.discount;
          }
          if (sortType === 'rating') {
            return b.rating - a.rating;
          }
          if (sortType === 'sells') {
            return b.sell_count - a.sell_count;
          }
        }
        return 0;
      });
      const filtered = sorted.filter((product) => {
        if (filter === 'stock') {
          return product.stock;
        }
        if (filter === 'out_of_stock') {
          return !product.stock;
        }
        if (filter === 'featured') {
          return product.is_featured;
        }
        if (filter === 'not_featured') {
          return !product.is_featured;
        }
        if (filter === 'upcoming') {
          return product.is_upcoming;
        }
        if (filter === 'not_upcoming') {
          return !product.is_upcoming;
        }
        if (filter === 'deleted') {
          return product.is_deleted;
        }
        if (filter === 'not_deleted') {
          return !product.is_deleted;
        }
        return product;
      });
      setSortedProducts(filtered);
    }
  }, [sortType, sortOrder, filter, products]);

  return (
    <>
      <div className='p-4'>
        <div className='mb-5 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between'>
          <TypographyH4>Products</TypographyH4>
          <div className='flex flex-col gap-2 lg:flex-row lg:items-center'>
            <Select
              value={sortType}
              onValueChange={(value) => setSortType(value === 'none' ? '' : value)}
            >
              <SelectTrigger className='w-full lg:w-[150px]'>
                <SelectValue placeholder='Sort type' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='none'>None</SelectItem>
                <SelectItem value='price'>Price</SelectItem>
                <SelectItem value='discount'>Discount</SelectItem>
                <SelectItem value='rating'>Rating</SelectItem>
                <SelectItem value='sells'>Sells</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={sortOrder}
              onValueChange={(value) => setSortOrder(value === 'none' ? '' : value)}
            >
              <SelectTrigger className='w-full lg:w-[150px]'>
                <SelectValue placeholder='Sort order' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='none'>None</SelectItem>
                <SelectItem value='asc'>Low - High</SelectItem>
                <SelectItem value='desc'>High - Low</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={filter}
              onValueChange={(value) => setFilter(value === 'none' ? '' : value)}
            >
              <SelectTrigger className='w-full lg:w-[150px]'>
                <SelectValue placeholder='Choose one' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='none'>None</SelectItem>
                <SelectItem value='stock'>Stock</SelectItem>
                <SelectItem value='out_of_stock'>Out of stock</SelectItem>
                <SelectItem value='featured'>Featured</SelectItem>
                <SelectItem value='not_featured'>Not Featured</SelectItem>
                <SelectItem value='upcoming'>Upcoming</SelectItem>
                <SelectItem value='not_upcoming'>Not Upcoming</SelectItem>
                <SelectItem value='deleted'>Deleted</SelectItem>
                <SelectItem value='not_deleted'>Not Deleted</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant={'destructive'}
              onClick={() => {
                setSortType('');
                setSortOrder('');
                setFilter('');
              }}
            >
              Reset
            </Button>
          </div>
        </div>
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
                  {tableHeadData?.map((head, index) => (
                    <TableHead
                      key={index}
                      className={head.toLowerCase() === sortType ? 'font-bold text-black' : ''}
                    >
                      {head}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedProducts?.map((product, index) => (
                  <TableRow key={index}>
                    <TableCell className='whitespace-nowrap p-4'>{index + 1}</TableCell>
                    <TableCell className='whitespace-nowrap p-4'>
                      <Link href={`/products/${product.slug}`} className='hover:underline'>
                        {product.name}
                      </Link>
                    </TableCell>
                    <TableCell className='whitespace-nowrap p-4'>{product.price}</TableCell>
                    <TableCell className='whitespace-nowrap p-4'>{product.discount}</TableCell>
                    <TableCell className='whitespace-nowrap p-4'>{product.rating}</TableCell>
                    <TableCell className='whitespace-nowrap p-4'>{product.sell_count}</TableCell>
                    <TableCell className='whitespace-nowrap p-4'>
                      <Switch
                        onCheckedChange={(value) => {
                          handleProductSwitchUpdate(product._id, { stock: value });
                        }}
                        checked={product.stock}
                      />
                    </TableCell>
                    <TableCell className='whitespace-nowrap p-4'>
                      <Switch
                        onCheckedChange={(value) => {
                          handleProductSwitchUpdate(product._id, { is_featured: value });
                        }}
                        checked={product.is_featured}
                      />
                    </TableCell>
                    <TableCell className='whitespace-nowrap p-4'>
                      <Switch
                        onCheckedChange={(value) => {
                          handleProductSwitchUpdate(product._id, { is_upcoming: value });
                        }}
                        checked={product.is_upcoming}
                      />
                    </TableCell>
                    <TableCell className='whitespace-nowrap p-4'>
                      <Switch
                        onCheckedChange={(value) => {
                          handleProductSwitchUpdate(product._id, { is_deleted: value });
                        }}
                        checked={product.is_deleted}
                      />
                    </TableCell>
                    <TableCell className='whitespace-nowrap p-4'>
                      <Badge className='mr-2 cursor-pointer'>
                        <Link href={`/dashboard/products/update?slug=${product.slug}`}>Edit</Link>
                      </Badge>
                      <Badge
                        variant={'destructive'}
                        onClick={() => {
                          setDeletedId(product._id);
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
