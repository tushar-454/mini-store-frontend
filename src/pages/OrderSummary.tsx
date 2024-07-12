import { useState } from 'react';
import OrderConfirm from '../components/OrderSummary/OrderConfirm';
import PaymentMethod from '../components/OrderSummary/PaymentMethod';
import ShippingAddress from '../components/OrderSummary/ShippingAddress';
import TotalSummary from '../components/OrderSummary/TotalSummary';
import Container from '../components/shared/Container';
import Title from '../components/shared/Title';

const OrderSummary = () => {
  const [curSummary, setCurSummary] = useState<string>('shipping');
  return (
    <section>
      <Container>
        <div>
          <Title>Order Summary</Title>
          {/* wrapper  */}
          <div className='pt-20'>
            {/* order summary top track bar */}
            <div className='relative mb-24'>
              <div className='flex justify-between'>
                <span
                  onClick={() => setCurSummary('shipping')}
                  className={`primaryBtn cursor-pointer rounded-full border border-green-600 ${curSummary !== 'shipping' ? 'bg-white text-green-600' : ''}`}
                >
                  1
                </span>
                <span
                  onClick={() => setCurSummary('payment')}
                  className={`primaryBtn cursor-pointer rounded-full border border-green-600 ${curSummary !== 'payment' ? 'bg-white text-green-600' : ''}`}
                >
                  2
                </span>
                <span
                  onClick={() => setCurSummary('summary')}
                  className={`primaryBtn cursor-pointer rounded-full border border-green-600 ${curSummary !== 'summary' ? 'bg-white text-green-600' : ''}`}
                >
                  3
                </span>
                <span
                  onClick={() => setCurSummary('confirm')}
                  className={`primaryBtn cursor-pointer rounded-full border border-green-600 ${curSummary !== 'confirm' ? 'bg-white text-green-600' : ''}`}
                >
                  4
                </span>
              </div>
              <div className='relative left-0 mx-auto mt-3 h-2 w-[98%] rounded-full bg-neutral-200'>
                <div
                  className={`h-2 rounded-full bg-green-600 transition-all ${curSummary === 'shipping' ? 'w-2' : curSummary === 'payment' ? 'w-[35%]' : curSummary === 'summary' ? 'w-[65%]' : curSummary === 'confirm' ? 'w-full' : ''}`}
                ></div>
              </div>
            </div>
            {/* order summary based on current track  */}
            {curSummary === 'shipping' && <ShippingAddress />}
            {curSummary === 'payment' && <PaymentMethod />}
            {curSummary === 'summary' && <TotalSummary />}
            {curSummary === 'confirm' && <OrderConfirm />}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default OrderSummary;
