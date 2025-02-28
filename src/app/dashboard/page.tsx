'use client';
import { useOrdersQuery } from '@/api/order';
import { useUsersQuery } from '@/api/user';
import { TypographyH2, TypographyH4 } from '@/components/ui/typography';
import { Link2 } from 'lucide-react';
import Link from 'next/link';

const Dashboard = () => {
  const { data: { data: users } = {} } = useUsersQuery({ length: 'true' });
  const { data: { data: totalOrders } = {} } = useOrdersQuery({ length: 'true' });
  const { data: { data: pendingOrders } = {} } = useOrdersQuery({
    length: 'true',
    statusFilter: 'pending',
  });
  const { data: { data: confirmOrders } = {} } = useOrdersQuery({
    length: 'true',
    statusFilter: 'confirm',
  });
  const { data: { data: shippedOrders } = {} } = useOrdersQuery({
    length: 'true',
    statusFilter: 'shipped',
  });
  const { data: { data: deliveredOrders } = {} } = useOrdersQuery({
    length: 'true',
    statusFilter: 'delivered',
  });
  const { data: { data: cancelOrders } = {} } = useOrdersQuery({
    length: 'true',
    statusFilter: 'cancelled',
  });
  return (
    <div className='p-4'>
      <TypographyH4>Dashboard</TypographyH4>
      <div className='mt-4 flex w-full flex-wrap gap-5 overflow-hidden'>
        <Card
          title='Total Orders'
          value={totalOrders?.toString() || '0'}
          link={`/dashboard/orders?status=''`}
        />
        <Card
          title='Pending Orders'
          value={pendingOrders?.toString() || '0'}
          link='/dashboard/orders?status=pending'
        />
        <Card
          title='Confirm Orders'
          value={confirmOrders?.toString() || '0'}
          link='/dashboard/orders?status=confirm'
        />
        <Card
          title='Shipped Orders'
          value={shippedOrders?.toString() || '0'}
          link='/dashboard/orders?status=shipped'
        />
        <Card
          title='Delivered Orders'
          value={deliveredOrders?.toString() || '0'}
          link='/dashboard/orders?status=delivered'
        />
        <Card
          title='Cancelled Orders'
          value={cancelOrders?.toString() || '0'}
          link='/dashboard/orders?status=cancelled'
        />
        <Card title='Total Users' value={users?.toString() || '0'} link='/dashboard/customers' />
      </div>
    </div>
  );
};

export default Dashboard;

const Card = ({ title, value, link }: { title: string; value: string; link: string }) => {
  return (
    <div className='flex-grow basis-[350px] rounded-lg border border-gray-200 bg-gradient-to-tr from-primary/10 to-primary-foreground/10 p-3 shadow-sm'>
      <div className='flex items-center justify-between'>
        <div>
          <TypographyH4 className='text-gray-500'>{title}</TypographyH4>
          <TypographyH2>{value}</TypographyH2>
        </div>
        <div className='rounded-full bg-gray-200 p-4'>
          <Link href={link}>
            <Link2 className='cursor-pointer' />
          </Link>
        </div>
      </div>
    </div>
  );
};
