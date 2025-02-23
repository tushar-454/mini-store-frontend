import Gradient from '@/components/ui/gradient';
import { TypographyH4, TypographyMuted } from '@/components/ui/typography';
import { updateOrderTransactionId } from '@/store/features/order';
import { AppDispatch } from '@/store/store';
import { useDispatch } from 'react-redux';
import { Input } from '../ui/input';

const TransactionId = () => {
  const dispatch = useDispatch<AppDispatch>();

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
      <TypographyMuted className='mb-4'>
        Pay Delivery charge first. Then, add the transaction ID.
      </TypographyMuted>
      <Input
        name='instructions'
        placeholder='describe your instructions . . .'
        className='h-[36px] overflow-hidden'
        onBlur={(e) => handleChanage(e.target.value)}
      />
    </div>
  );
};

export { TransactionId };
