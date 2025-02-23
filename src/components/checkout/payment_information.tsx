import { Checkbox } from '../ui/checkbox';
import Gradient from '../ui/gradient';
import { TypographyH4 } from '../ui/typography';

const PaymentInformation = () => {
  return (
    <div>
      <TypographyH4 className=''>
        <Gradient>Payment Information</Gradient>
      </TypographyH4>
      <div className='mt-4'>
        <label htmlFor='cod' className='flex select-none items-center gap-2'>
          <Checkbox id='cod' checked disabled />
          Cash on Delivery
        </label>
      </div>
    </div>
  );
};

export { PaymentInformation };
