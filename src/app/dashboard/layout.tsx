'use client';
import { DashboardHeader } from '@/components/dashboard/dashboard_header';
import { DashboardSidebar } from '@/components/dashboard/dashboard_sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/toaster';
import { store } from '@/store/store';
import { SessionProvider } from 'next-auth/react';
import React from 'react';
import { Provider } from 'react-redux';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <SessionProvider>
        <Toaster />
        <SidebarProvider>
          <div className='flex w-full'>
            <DashboardSidebar />
            <main className='w-full flex-grow overflow-x-auto'>
              {/* dashboard header  */}
              <DashboardHeader />
              {children}
            </main>
          </div>
        </SidebarProvider>
      </SessionProvider>
    </Provider>
  );
};

export default DashboardLayout;
