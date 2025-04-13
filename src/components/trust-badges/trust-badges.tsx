import { Award, Clock, CreditCard, Shield, ThumbsUp, Truck } from 'lucide-react';
import Image from 'next/image';

export default function TrustBadges() {
  const badges = [
    {
      icon: <Shield className='mb-3 h-8 w-8 text-emerald-600' />,
      title: 'Secure Shopping',
      description: '256-bit SSL Encryption',
    },
    {
      icon: <CreditCard className='mb-3 h-8 w-8 text-emerald-600' />,
      title: 'Safe Payment',
      description: 'Multiple Payment Options',
    },
    {
      icon: <Truck className='mb-3 h-8 w-8 text-emerald-600' />,
      title: 'Fast Shipping',
      description: 'Quick & Reliable Delivery',
    },
    {
      icon: <Award className='mb-3 h-8 w-8 text-emerald-600' />,
      title: 'Quality Guarantee',
      description: 'Authentic Products',
    },
    {
      icon: <ThumbsUp className='mb-3 h-8 w-8 text-emerald-600' />,
      title: 'Customer Satisfaction',
      description: '4.8/5 Average Rating',
    },
    {
      icon: <Clock className='mb-3 h-8 w-8 text-emerald-600' />,
      title: '24/7 Support',
      description: 'Always Here to Help',
    },
  ];

  return (
    <section className='border-b border-t border-gray-200 bg-gray-50 py-10'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-2 gap-6 text-center md:grid-cols-3 lg:grid-cols-6'>
          {badges.map((badge, index) => (
            <div key={index} className='flex flex-col items-center'>
              {badge.icon}
              <h3 className='text-sm font-medium'>{badge.title}</h3>
              <p className='text-xs text-muted-foreground'>{badge.description}</p>
            </div>
          ))}
        </div>

        <div className='mt-10 flex flex-wrap items-center justify-center gap-8'>
          <Image
            width={400}
            height={100}
            src='https://img001.prntscr.com/file/img001/TFAKHg1EQv2Qf47uwyXaMw.png'
            alt='Visa'
            className='opacity-70 transition-opacity hover:opacity-100'
          />
        </div>
      </div>
    </section>
  );
}
