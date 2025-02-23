import { removeLocalStorage } from '@/lib/utils';
import { signOut } from 'next-auth/react';
import { Button } from '../ui/button';
import { useSidebar } from '../ui/sidebar';
import { TypographyH3 } from '../ui/typography';

const DashboardHeader = () => {
  const { toggleSidebar } = useSidebar();
  return (
    <header className='w-full border-b border-gray-200'>
      <div className='flex items-center justify-between p-4'>
        <div className='flex items-center gap-3'>
          <Button variant={'outline'} onClick={() => toggleSidebar()}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M4 6h16M4 12h16m-7 6h7'
              />
            </svg>
          </Button>
          <TypographyH3>Admin Dashboard</TypographyH3>
        </div>
        <div>
          <Button
            variant={'destructive'}
            onClick={() => {
              signOut();
              removeLocalStorage('isLogin');
            }}
          >
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
};

export { DashboardHeader };
