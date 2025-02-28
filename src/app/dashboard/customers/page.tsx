'use client';

import { useUpdateUserMutation, useUsersQuery } from '@/api/user';
import TableSkeleton from '@/components/dashboard/table_skeleton';
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
import { TypographyH4, TypographyP, TypographySmall } from '@/components/ui/typography';
import { capitalizeFirstLetter } from '@/lib/utils';
import Image from 'next/image';
import { useEffect } from 'react';

const tableHeadData = ['No', 'User', 'Phone', 'Role', 'Status', 'Deleted'];

const Customers = () => {
  const { data: { data: users } = {}, isError, isLoading, refetch } = useUsersQuery({});
  const [updateUser] = useUpdateUserMutation();

  const handleRoleChange = async (id: string, value: string) => {
    if (value !== 'admin' && value !== 'user') return;
    await updateUser({ _id: id, role: value });
  };

  const handleStatusChange = async (id: string, value: string) => {
    if (value !== 'active' && value !== 'inactive') return;
    await updateUser({ _id: id, status: value });
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div className='p-4'>
      <TypographyH4 className='mb-5'>Customers</TypographyH4>
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
              {users?.map((user, index) => (
                <TableRow key={index}>
                  <TableCell className='whitespace-nowrap p-4'>{index + 1}</TableCell>
                  <TableCell className='flex items-center gap-2 whitespace-nowrap p-4'>
                    <Image
                      src={user.photo}
                      alt={user.name}
                      width={40}
                      height={40}
                      className='rounded-full'
                    />
                    <div className='flex flex-col gap-1'>
                      <TypographyP>{user.name}</TypographyP>
                      <TypographySmall>{user.email}</TypographySmall>
                    </div>
                  </TableCell>
                  <TableCell className='whitespace-nowrap p-4'>
                    <a href={`tel:${user.phone}`}>{user.phone ?? 'N/A'}</a>
                  </TableCell>
                  <TableCell className='whitespace-nowrap p-4'>
                    <Select onValueChange={(value) => handleRoleChange(user._id, value)}>
                      <SelectTrigger className='w-[180px]'>
                        <SelectValue placeholder={capitalizeFirstLetter(user.role)} />
                        <SelectContent>
                          <SelectItem value='user'>User</SelectItem>
                          <SelectItem value='admin'>Admin</SelectItem>
                        </SelectContent>
                      </SelectTrigger>
                    </Select>
                  </TableCell>
                  <TableCell className='whitespace-nowrap p-4'>
                    <Select onValueChange={(value) => handleStatusChange(user._id, value)}>
                      <SelectTrigger className='w-[180px]'>
                        <SelectValue placeholder={capitalizeFirstLetter(user.status)} />
                        <SelectContent>
                          <SelectItem value='active'>Active</SelectItem>
                          <SelectItem value='inactive'>Inactive</SelectItem>
                        </SelectContent>
                      </SelectTrigger>
                    </Select>
                  </TableCell>
                  <TableCell className='whitespace-nowrap p-4'>
                    <Switch checked={user.is_deleted} />
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

export default Customers;
