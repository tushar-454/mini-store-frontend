import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import OrderConfirm from '../components/OrderSummary/OrderConfirm';
import PaymentMethod from '../components/OrderSummary/PaymentMethod';
import ShippingAddress from '../components/OrderSummary/ShippingAddress';
import TotalSummary from '../components/OrderSummary/TotalSummary';
import Container from '../components/shared/Container';
import Title from '../components/shared/Title';

const OrderSummary = () => {
  const [curSummary, setCurSummary] = useState<string>('shipping');
  const [method, setMethod] = useState<string>('payOnline');
  const [isEdit, setIsEdit] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const carts = localStorage.getItem('carts');
    if (!carts) {
      navigate('/cart');
      toast.error('Cart is empty');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section>
      <Container>
        <div>
          <Title>Order Summary</Title>
          {/* wrapper  */}
          <div className='mx-auto w-full py-20 lg:w-3/4'>
            {/* order summary top track bar */}
            <div className='relative mb-24'>
              <div className='flex justify-between'>
                <span
                  onClick={() => {
                    setCurSummary('shipping');
                  }}
                  className={`primaryBtn cursor-pointer rounded-full border border-green-600 ${curSummary !== 'shipping' ? 'bg-white text-green-600' : ''}`}
                >
                  1
                </span>
                <span
                  onClick={() => {
                    if (isEdit) {
                      toast.error('Save your address');
                      return;
                    }
                    setCurSummary('payment');
                  }}
                  className={`primaryBtn cursor-pointer rounded-full border border-green-600 ${curSummary !== 'payment' ? 'bg-white text-green-600' : ''}`}
                >
                  2
                </span>
                <span
                  onClick={() => {
                    if (isEdit) {
                      toast.error('Save your address');
                      return;
                    }
                    setCurSummary('summary');
                  }}
                  className={`primaryBtn cursor-pointer rounded-full border border-green-600 ${curSummary !== 'summary' ? 'bg-white text-green-600' : ''}`}
                >
                  3
                </span>
                <span
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
              <div>
                <div className='mt-3 flex justify-between'>
                  <span>Shipping Address</span>
                  <span>Payment Method</span>
                  <span>Order Summary</span>
                  <span>Order Confirm</span>
                </div>
              </div>
            </div>
            {/* order summary based on current track  */}
            {curSummary === 'shipping' && (
              <ShippingAddress isEdit={isEdit} setIsEdit={setIsEdit} />
            )}
            {curSummary === 'payment' && (
              <PaymentMethod setMethod={setMethod} />
            )}
            {curSummary === 'summary' && (
              <TotalSummary setCurSummary={setCurSummary} method={method} />
            )}
            {curSummary === 'confirm' && <OrderConfirm />}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default OrderSummary;
