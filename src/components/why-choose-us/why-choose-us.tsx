import {
  BadgeCheck,
  CreditCard,
  HeadphonesIcon,
  RefreshCw,
  ShieldCheck,
  Truck,
} from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function WhyChooseUs() {
  const features = [
    {
      icon: <Truck className='h-10 w-10 text-emerald-500' />,
      title: 'Fast Delivery',
      description: 'Free shipping on orders over $50. We deliver within 2-3 business days.',
    },
    {
      icon: <BadgeCheck className='h-10 w-10 text-emerald-500' />,
      title: 'Quality Products',
      description: 'All our products are carefully selected to ensure the highest quality.',
    },
    {
      icon: <HeadphonesIcon className='h-10 w-10 text-emerald-500' />,
      title: '24/7 Customer Support',
      description: 'Our support team is always available to help you with any questions.',
    },
    {
      icon: <RefreshCw className='h-10 w-10 text-emerald-500' />,
      title: 'Easy Returns',
      description: '30-day return policy. No questions asked, hassle-free returns.',
    },
    {
      icon: <ShieldCheck className='h-10 w-10 text-emerald-500' />,
      title: 'Secure Payments',
      description: 'Your payment information is always protected with advanced encryption.',
    },
    {
      icon: <CreditCard className='h-10 w-10 text-emerald-500' />,
      title: 'Loyalty Rewards',
      description: 'Earn points with every purchase and redeem them for exclusive discounts.',
    },
  ];

  return (
    <section className='bg-white py-16'>
      <div className='container mx-auto px-4'>
        <div className='mb-12 text-center'>
          <h2 className='mb-4 text-3xl font-bold tracking-tight'>Why Choose Us?</h2>
          <p className='mx-auto max-w-2xl text-muted-foreground'>
            We&apos;re committed to providing the best shopping experience with quality products and
            exceptional service.
          </p>
        </div>

        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {features.map((feature, index) => (
            <Card
              key={index}
              className='border border-gray-200 transition-all duration-200 hover:shadow-md'
            >
              <CardHeader className='flex flex-row items-center gap-4 pb-2'>
                {feature.icon}
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className='text-sm text-gray-600'>
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
