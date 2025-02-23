'use client';

import { assets } from '@/assets/assets';
import { Facebook, Mail, Map, Phone, PhoneCall, YoutubeIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { TypographyH4, TypographyMuted } from '../ui/typography';

const Footer = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v21.0';
    script.async = true;
    script.defer = true;
    script.crossOrigin = 'anonymous';
    document.body.appendChild(script);
  }, []);
  return (
    <footer className='bg-foreground pt-10'>
      <div className='mx-auto max-w-screen-xl px-4 2xl:px-0'>
        <div className='flex flex-col justify-between sm:px-[18px] md:flex-row md:px-10'>
          {/* column 1 */}
          <div className='md:w-[316px]'>
            <Link href='/' className='flex items-center gap-2'>
              <Image
                src={assets.logo}
                alt='logo'
                width={50}
                height={50}
                className='size-16 rounded-full'
              />
              <TypographyH4 className='flex flex-col'>
                <span className='text-white'>Adnan Homemade </span>
                <span className='text-white'>Cake Shop</span>
              </TypographyH4>
            </Link>
            <p className='mt-[18px] text-[15px] font-normal text-white/[80%]'>
              At Adnan Homemade Cake Shop, we are dedicated to delivering healthy and delicious
              cakes right to your doorstep. Our focus is on using the finest ingredients to ensure
              the best quality and taste. We believe in making our clients happy with every bite,
              providing a delightful experience with our homemade cakes.
            </p>
            <div className='mt-[18px] flex gap-4'>
              <a
                className='transition-all hover:scale-110'
                target='_blank'
                href='https://www.facebook.com/profile.php?id=61568352154994'
              >
                <Facebook size={25} className='text-white' />
              </a>
              <a
                className='transition-all hover:scale-110'
                target='_blank'
                href='https://wa.me/+8801817967410'
              >
                <Phone size={25} className='text-white' />
              </a>
              <a
                className='transition-all hover:scale-110'
                target='_blank'
                href='https://www.youtube.com/'
              >
                <YoutubeIcon size={25} className='text-white' />
              </a>
            </div>
          </div>
          {/* column 2 */}
          <div className='md:w-[316px]'>
            <div className='mt-[23px] flex'>
              <div className='flex h-[38px] w-[38px] items-center justify-center rounded-[75%]'>
                <PhoneCall size={24} className='text-white' />
              </div>
              <div className='ml-[18px]'>
                <a
                  href='tel:+8801817967410'
                  className='font-Inter text-[14px] font-medium text-white'
                >
                  +8801817-967410
                </a>
                <p className='font-Inter text-[12px] font-medium text-white'>Support Number</p>
              </div>
            </div>
            <div className='mt-[23px] flex'>
              <div className='flex h-[38px] w-[38px] items-center justify-center rounded-[75%]'>
                <Mail size={24} className='text-white' />
              </div>
              <div className='ml-[18px]'>
                <a
                  href='mailto:mohammad1112024adnan@gmail.com'
                  className='font-Inter text-[14px] font-medium text-[#fff]'
                >
                  mohammad1112024adnan@gmail.com
                </a>
                <p className='font-Inter text-[12px] font-medium text-[#fff]'>Support Email</p>
              </div>
            </div>
            <div className='mt-[23px] flex'>
              <div className='flex h-[38px] w-[38px] items-center justify-center rounded-[75%]'>
                <Map size={24} className='text-white' />
              </div>
              <div className='ml-[18px]'>
                <a
                  href='mailto:help@lorem.com'
                  className='font-Inter text-[14px] font-medium text-[#fff]'
                >
                  3515 - Meghna, Comilla, Bangladesh
                </a>
                <p className='font-Inter text-[12px] font-medium text-white'>Address</p>
              </div>
            </div>
          </div>
          {/* column 3 */}
          <div className='mt-6 flex w-full flex-col justify-between text-white sm:flex-row md:mt-0 md:max-w-[341px]'>
            <div className=''>
              <div id='fb-root'></div>
              <div
                className='fb-page'
                data-href='https://www.facebook.com/profile.php?id=61568352154994'
                data-tabs=''
                data-width=''
                data-height=''
                data-small-header='false'
                data-adapt-container-width='false'
                data-hide-cover='false'
                data-show-facepile='false'
              >
                <blockquote
                  cite='https://www.facebook.com/profile.php?id=61568352154994'
                  className='fb-xfbml-parse-ignore'
                >
                  <a href='https://www.facebook.com/profile.php?id=61568352154994'>
                    Adnan Homemade Cake-আদনান হোমমেড কেক{' '}
                  </a>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className='mt-[30px] text-white' />
      <div className='flex items-center justify-center py-6'>
        <TypographyMuted className='text-center'>
          © Copyright 2024 , All Rights Reserved by Adnan Homemade Cake Shop
        </TypographyMuted>
      </div>
      {/* float whatsapp icon */}
      <a
        href='https://wa.me/+8801817967410'
        className='fixed bottom-5 right-5 z-50 animate-bounce cursor-pointer rounded-full shadow-2xl'
        target='_blank'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          version='1.1'
          xmlnsXlink='http://www.w3.org/1999/xlink'
          width='60'
          height='60'
          x='0'
          y='0'
          viewBox='0 0 176 176'
          xmlSpace='preserve'
        >
          <g>
            <g data-name='Layer 2'>
              <g data-name='09.whatsapp'>
                <circle
                  cx='88'
                  cy='88'
                  r='88'
                  fill='#58dc48'
                  opacity='1'
                  data-original='#29a71a'
                ></circle>
                <g fill='#fff'>
                  <path
                    d='M126.8 49.2a54.57 54.57 0 0 0-87.42 63.13l-5.79 28.11a2.08 2.08 0 0 0 .33 1.63 2.11 2.11 0 0 0 2.24.87l27.55-6.53A54.56 54.56 0 0 0 126.8 49.2zm-8.59 68.56a42.74 42.74 0 0 1-49.22 8l-3.84-1.9-16.89 4 .05-.21 3.5-17-1.88-3.71a42.72 42.72 0 0 1 7.86-49.59 42.73 42.73 0 0 1 60.42 0 2.28 2.28 0 0 0 .22.22 42.72 42.72 0 0 1-.22 60.19z'
                    fill='#ffffff'
                    opacity='1'
                    data-original='#ffffff'
                  ></path>
                  <path
                    d='M116.71 105.29c-2.07 3.26-5.34 7.25-9.45 8.24-7.2 1.74-18.25.06-32-12.76l-.17-.15C63 89.41 59.86 80.08 60.62 72.68c.42-4.2 3.92-8 6.87-10.48a3.93 3.93 0 0 1 6.15 1.41l4.45 10a3.91 3.91 0 0 1-.49 4l-2.25 2.92a3.87 3.87 0 0 0-.35 4.32c1.26 2.21 4.28 5.46 7.63 8.47 3.76 3.4 7.93 6.51 10.57 7.57a3.82 3.82 0 0 0 4.19-.88l2.61-2.63a4 4 0 0 1 3.9-1l10.57 3a4 4 0 0 1 2.24 5.91z'
                    fill='#ffffff'
                    opacity='1'
                    data-original='#ffffff'
                  ></path>
                </g>
              </g>
            </g>
          </g>
        </svg>
      </a>
    </footer>
  );
};

export default Footer;
