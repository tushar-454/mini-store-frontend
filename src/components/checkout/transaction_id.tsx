import { assets } from '@/assets/assets';
import Gradient from '@/components/ui/gradient';
import {
  TypographyH3,
  TypographyH4,
  TypographyMuted,
  TypographyP,
} from '@/components/ui/typography';
import { copyToClipboard } from '@/lib/utils';
import { updateOrderTransactionId } from '@/store/features/order';
import { AppDispatch } from '@/store/store';
import { Copy, FileCheck } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Input } from '../ui/input';

const TransactionId = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [copy, setCopy] = useState(false);

  const handleChanage = async (value: string) => {
    dispatch(updateOrderTransactionId(value));
  };

  return (
    <div>
      <TypographyH4>
        <Gradient>
          Transaction ID <span className='text-red-500'>*</span>
        </Gradient>
      </TypographyH4>
      <TypographyMuted>Pay Delivery charge first. Then, add the transaction ID.</TypographyMuted>
      <TypographyP className='text-red-500' style={{ fontFamily: 'Tiro Bangla' }}>
        প্রথমে ডেলিভারি চার্জ পরিশোধ করুন। তারপর, ট্রানজেকশন আইডি যোগ করুন।
      </TypographyP>
      <div>
        <div className='mb-4 flex items-center gap-2'>
          <Image src={assets.paymentGateway} width={150} height={50} alt='payment-gateway' />
          <TypographyH3 className='flex items-center gap-2 text-neutral-700'>
            01617711588
            <span>
              {copy ? (
                <FileCheck
                  className='cursor-pointer'
                  onClick={() => {
                    copyToClipboard('01617711588');
                  }}
                />
              ) : (
                <Copy
                  className='cursor-pointer'
                  onClick={() => {
                    setCopy(true);
                    copyToClipboard('01617711588');
                  }}
                />
              )}
            </span>
          </TypographyH3>
        </div>
      </div>
      <Input
        name='instructions'
        placeholder='Enter transaction ID'
        className='h-[36px] overflow-hidden'
        onBlur={(e) => handleChanage(e.target.value)}
      />
    </div>
  );
};

export { TransactionId };
