'use client';

import type React from 'react';

import { Send } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      toast({
        title: 'Invalid email',
        description: 'Please enter a valid email address.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      toast({
        title: 'Success!',
        description: "You've been subscribed to our newsletter.",
      });
      setEmail('');
      setIsLoading(false);
    }, 1000);

    // In a real implementation, you would call your API here
    // try {
    //   await fetch('/api/subscribe', {
    //     method: 'POST',
    //     body: JSON.stringify({ email }),
    //     headers: { 'Content-Type': 'application/json' },
    //   })
    //   toast({
    //     title: "Success!",
    //     description: "You've been subscribed to our newsletter.",
    //   })
    //   setEmail("")
    // } catch (error) {
    //   toast({
    //     title: "Error",
    //     description: "Failed to subscribe. Please try again.",
    //     variant: "destructive",
    //   })
    // } finally {
    //   setIsLoading(false)
    // }
  };

  return (
    <section className='bg-gray-50 py-16'>
      <div className='container mx-auto px-4'>
        <div className='mx-auto max-w-3xl text-center'>
          <h2 className='mb-4 text-3xl font-bold tracking-tight'>Stay Updated</h2>
          <p className='mb-8 text-muted-foreground'>
            Subscribe to our newsletter for exclusive deals, new arrivals, and style tips.
          </p>

          <form
            onSubmit={handleSubmit}
            className='mx-auto flex max-w-md flex-col gap-3 sm:flex-row'
          >
            <Input
              type='email'
              placeholder='Enter your email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='flex-1'
              required
            />
            <Button type='submit' disabled={isLoading}>
              {isLoading ? (
                <span className='flex items-center gap-2'>
                  <div className='h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent' />
                  Subscribing
                </span>
              ) : (
                <span className='flex items-center gap-2'>
                  Subscribe <Send className='h-4 w-4' />
                </span>
              )}
            </Button>
          </form>

          <p className='mt-4 text-xs text-muted-foreground'>
            By subscribing, you agree to our Privacy Policy and consent to receive updates from our
            company.
          </p>
        </div>
      </div>
    </section>
  );
}
