'use client';

import { OrderData, useOrdersQuery, useUpdateOrderMutation } from '@/api/order';
import TableSkeleton from '@/components/dashboard/table_skeleton';
import { DateTimePicker } from '@/components/ui/date-time-picker';
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
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

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

const OrdersPage = () => {
  const searchParams = useSearchParams();
  const status = searchParams.get('status');
  const { toast } = useToast();
  const [updateOrder] = useUpdateOrderMutation();
  const [statusFilter, setStatusFilter] = useState(status || '');
  const [startAtFilter, setStartAtFilter] = useState('');
  const [endAtFilter, setEndAtFilter] = useState('');
  const { data: { data: orders } = {}, isError, isLoading, refetch } = useOrdersQuery({});
  const [filterOrders, setFilterOrders] = useState<OrderData[]>([]);
  const router = useRouter();

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

  const handleDateFilter = (dateType: string, date: Date) => {
    // const formatDate = `${date.getMonth() + 1}/${date?.getDate()}/${date?.getFullYear()}`;
    if (dateType === 'startAtFilter') setStartAtFilter(date.toISOString());
    if (dateType === 'endAtFilter') setEndAtFilter(date.toISOString());
  };

  useEffect(() => {
    if (!isLoading && isError) {
      toast({
        variant: 'destructive',
        title: 'You are not authorized. Token expired',
        description: 'Please login again.',
      });
      setTimeout(() => {
        removeLocalStorage('isLogin');
        signOut();
      }, 2000);
      return;
    }

    if (orders) {
      if (!startAtFilter && !endAtFilter && !statusFilter) {
        setFilterOrders(orders);
        return;
      }
      if (startAtFilter && !endAtFilter && !statusFilter) {
        setFilterOrders(
          orders.filter((order) => new Date(order.createdAt) >= new Date(startAtFilter)),
        );
        return;
      }
      if (!startAtFilter && endAtFilter && !statusFilter) {
        setFilterOrders(
          orders.filter((order) => new Date(order.createdAt) <= new Date(endAtFilter)),
        );
        return;
      }
      if (!startAtFilter && !endAtFilter && statusFilter) {
        setFilterOrders(orders.filter((order) => order.status === statusFilter));
        return;
      }
      if (startAtFilter && endAtFilter && !statusFilter) {
        setFilterOrders(
          orders.filter(
            (order) =>
              new Date(order.createdAt) >= new Date(startAtFilter) &&
              new Date(order.createdAt) <= new Date(endAtFilter),
          ),
        );
        return;
      }
      if (startAtFilter && !endAtFilter && statusFilter) {
        setFilterOrders(
          orders.filter(
            (order) =>
              new Date(order.createdAt) >= new Date(startAtFilter) && order.status === statusFilter,
          ),
        );
        return;
      }
      if (!startAtFilter && endAtFilter && statusFilter) {
        setFilterOrders(
          orders.filter(
            (order) =>
              new Date(order.createdAt) <= new Date(endAtFilter) && order.status === statusFilter,
          ),
        );
        return;
      }
      if (startAtFilter && endAtFilter && statusFilter) {
        setFilterOrders(
          orders.filter(
            (order) =>
              new Date(order.createdAt) >= new Date(startAtFilter) &&
              new Date(order.createdAt) <= new Date(endAtFilter) &&
              order.status === statusFilter,
          ),
        );
      }
    }
  }, [
    startAtFilter,
    endAtFilter,
    statusFilter,
    setFilterOrders,
    orders,
    isLoading,
    isError,
    toast,
  ]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleStatusFilterFunc = (value: string) => {
    setStatusFilter(value === 'all' ? '' : value);
    router.push(`/dashboard/orders?status=${value === 'all' ? '' : value}`);
  };
  return (
    <div className='p-4'>
      <div className='mb-5 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between'>
        <TypographyH4>Orders</TypographyH4>
        <div className='flex flex-col gap-2 lg:flex-row lg:items-center'>
          <DateTimePicker
            placeholder='Start Date'
            onChange={(date) => date && handleDateFilter('startAtFilter', date)}
          />
          <DateTimePicker
            placeholder='End Date'
            onChange={(date) => date && handleDateFilter('endAtFilter', date)}
          />
          <Select value={statusFilter} onValueChange={(value) => handleStatusFilterFunc(value)}>
            <SelectTrigger className='w-full lg:w-[150px]'>
              <SelectValue placeholder='Filter by status' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All</SelectItem>
              <SelectItem value='pending'>Pending</SelectItem>
              <SelectItem value='confirm'>Confirm</SelectItem>
              <SelectItem value='shipped'>Shipped</SelectItem>
              <SelectItem value='delivered'>Delivered</SelectItem>
              <SelectItem value='cancelled'>Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
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
              {filterOrders?.map((order, index) => (
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

export default OrdersPage;
