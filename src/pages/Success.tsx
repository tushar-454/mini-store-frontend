import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import success from '../assets/success.webp';

const Success = () => {
  const params = useParams();
  useEffect(() => {
    const { transactionId } = params;
    fetch(`/payment/check-payment/${transactionId}`).then((res) => {
      if (res.status === 200) {
        localStorage.removeItem('carts');
      }
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);
    });
  }, [params]);
  return (
    <div className='flex items-center justify-center'>
      <img data-aos='zoom in' src={success} alt='success image' />
    </div>
  );
};

export default Success;
