'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownTimerProps {
  targetDate: Date;
  title?: string;
  description?: string;
}

export default function CountdownTimer({
  targetDate,
  title = 'Flash Sale Ends In',
  description = "Don't miss out on these amazing deals!",
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();

      if (difference <= 0) {
        setIsExpired(true);
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const formatNumber = (num: number): string => {
    return num < 10 ? `0${num}` : num.toString();
  };

  if (isExpired) {
    return (
      <div className='rounded-lg bg-gray-100 px-4 py-8 text-center'>
        <h3 className='mb-2 text-xl font-bold'>Sale Ended</h3>
        <p className='text-muted-foreground'>This offer is no longer available.</p>
      </div>
    );
  }

  return (
    <div className='rounded-lg bg-gradient-to-r from-emerald-600 to-emerald-500 px-4 py-10 text-white'>
      <div className='mb-6 text-center'>
        <h3 className='mb-2 text-2xl font-bold'>{title}</h3>
        <p className='text-emerald-50'>{description}</p>
      </div>

      <div className='flex justify-center gap-4'>
        <div className='flex flex-col items-center'>
          <div className='mb-1 flex h-16 w-16 items-center justify-center rounded-lg bg-white text-2xl font-bold text-emerald-700'>
            {formatNumber(timeLeft.days)}
          </div>
          <span className='text-xs text-emerald-50'>Days</span>
        </div>

        <div className='flex flex-col items-center'>
          <div className='mb-1 flex h-16 w-16 items-center justify-center rounded-lg bg-white text-2xl font-bold text-emerald-700'>
            {formatNumber(timeLeft.hours)}
          </div>
          <span className='text-xs text-emerald-50'>Hours</span>
        </div>

        <div className='flex flex-col items-center'>
          <div className='mb-1 flex h-16 w-16 items-center justify-center rounded-lg bg-white text-2xl font-bold text-emerald-700'>
            {formatNumber(timeLeft.minutes)}
          </div>
          <span className='text-xs text-emerald-50'>Minutes</span>
        </div>

        <div className='flex flex-col items-center'>
          <div className='mb-1 flex h-16 w-16 animate-pulse items-center justify-center rounded-lg bg-white text-2xl font-bold text-emerald-700'>
            {formatNumber(timeLeft.seconds)}
          </div>
          <span className='text-xs text-emerald-50'>Seconds</span>
        </div>
      </div>

      <div className='mt-6 text-center'>
        <Link
          href={'/products'}
          className='rounded-full bg-white px-6 py-2 font-medium text-emerald-600 transition-colors hover:bg-emerald-50'
        >
          Shop Now
        </Link>
      </div>
    </div>
  );
}
