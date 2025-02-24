'use client';

import { useOrdersQuery, useUpdateOrderMutation } from '@/api/order';
import TableSkeleton from '@/components/dashboard/table_skeleton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
import { capitalizeFirstLetter, formatDate, removeLocalStorage } from '@/lib/utils';
import { Printer } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { useEffect } from 'react';

const tableHeadData = [
  'No',
  'Transaction ID',
  'Customer Name',
  'Phone',
  'Email',
  'Order Date',
  'Items',
  'Total Price',
  'Discount',
  'Street Address',
  'Address',
  'Custom Instruction',
  'Order Status',
  'Order ID',
  'Invoice',
];

const Orders = () => {
  const { toast } = useToast();
  const { data: { data: orders } = {}, isError, isLoading, refetch } = useOrdersQuery();
  const [updateOrder] = useUpdateOrderMutation();

  const handleOrderStatusUpdate = async (orderId: string, status: string) => {
    const { data, error } = await updateOrder({ _id: orderId, status });
    if (error && 'status' in error) {
      if (error.status === 403) {
        toast({
          variant: 'destructive',
          title: 'Order status update failed',
          description: 'Maybe your token is expired. Please login again.',
        });
        setTimeout(() => {
          removeLocalStorage('isLogin');
          signOut();
        }, 2000);
        return;
      }
    }
    if (data?.success) {
      toast({
        title: 'Order status update',
      });
    }
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div className='p-4'>
      <TypographyH4 className='mb-5'>Orders</TypographyH4>
      <div className='w-full overflow-hidden'>
        {isLoading && <TableSkeleton height='h-8' />}
        {isError && (
          <TypographyP className='text-center text-red-500'>
            Something is wrong while fetching orders. Maybe your token is expired. Please login
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
              {orders?.map((order, index) => (
                <TableRow
                  key={index}
                  className={`hover:bg-gray-200 ${index % 2 === 0 ? 'bg-gray-100' : ''}`}
                >
                  <TableCell className='whitespace-nowrap p-4'>{++index}</TableCell>
                  <TableCell className='whitespace-nowrap p-4'>{order.transactionId}</TableCell>
                  <TableCell className='whitespace-nowrap p-4'>{order.name}</TableCell>
                  <TableCell className='whitespace-nowrap p-4'>
                    <a href={`tel:${order.phone}`}>{order.phone}</a>
                  </TableCell>
                  <TableCell className='whitespace-nowrap p-4'>
                    <a href={`mailto:${order.email}`}>{order.email.split('@')[0]}</a>
                  </TableCell>
                  <TableCell className='whitespace-nowrap p-4'>
                    {formatDate(order.createdAt)}
                  </TableCell>
                  <TableCell className='whitespace-nowrap p-4'>{order.line_items.length}</TableCell>
                  <TableCell className='whitespace-nowrap p-4'>{order.price}</TableCell>
                  <TableCell className='whitespace-nowrap p-4'>{order.discount}</TableCell>
                  <TableCell className='whitespace-nowrap p-4'>{order.address}</TableCell>
                  <TableCell className='whitespace-nowrap p-4'>{`${order.sub_district} - ${order.district} - ${order.division}`}</TableCell>
                  <TableCell className='whitespace-nowrap p-4'>
                    {order.instruction ? order.instruction : 'N/A'}
                  </TableCell>
                  <TableCell>
                    <Select onValueChange={(value) => handleOrderStatusUpdate(order._id, value)}>
                      <SelectTrigger className='w-[180px]'>
                        <SelectValue placeholder={capitalizeFirstLetter(order.status)} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='cancelled'>Cancelled</SelectItem>
                        <SelectItem value='pending'>Pending</SelectItem>
                        <SelectItem value='confirm'>Confirm</SelectItem>
                        <SelectItem value='shipped'>Shipped</SelectItem>
                        <SelectItem value='delivered'>Delivered</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className='whitespace-nowrap p-4'>
                    <a
                      href={`/track-order/${order.tracking_id}`}
                      target='_blank'
                      className='hover:underline'
                    >
                      {order.tracking_id}
                    </a>
                  </TableCell>
                  <TableCell className='whitespace-nowrap p-4'>
                    <a href={`/invoice/${order.tracking_id}`} target='_blank'>
                      <Printer className='cursor-pointer' />
                    </a>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default Orders;
