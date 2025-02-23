import { Button } from '@/components/ui/button';
import { TypographyH2 } from '@/components/ui/typography';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4'>
      <TypographyH2 className='mb-4 text-red-600'>404 - Page Not Found</TypographyH2>
      <p className='mb-6 text-gray-700'>The page you are looking for does not exist.</p>
      <Button variant={'default'}>
        <Link href='/'>Return Home</Link>
      </Button>
    </div>
  );
}
