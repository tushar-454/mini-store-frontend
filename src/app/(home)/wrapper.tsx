'use client';

import { Toaster } from '@/components/ui/toaster';
import { store } from '@/store/store';
import { SessionProvider } from 'next-auth/react';
import { Provider } from 'react-redux';

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <Toaster />
      <SessionProvider>{children}</SessionProvider>
    </Provider>
  );
};

export { Wrapper };
