'use client';
import { useCreateOrderMutation } from '@/api/order';
import { CouponCode } from '@/components/checkout/coupon_code';
import { CustomInstruction } from '@/components/checkout/custom_instruction';
import { PaymentInformation } from '@/components/checkout/payment_information';
import { ProductsTable } from '@/components/checkout/products_table';
import { ShippingAddress } from '@/components/checkout/shipping_address';
import { Container } from '@/components/shared/container';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import Gradient from '@/components/ui/gradient';
import { TypographyH3, TypographyLarge } from '@/components/ui/typography';
import { DISTRICTS, DIVISIONS, UPAZILLAS } from '@/constant/location';
import { useToast } from '@/hooks/use-toast';
import { copyToClipboard, getDataSessionStorage } from '@/lib/utils';
import { clearCart } from '@/store/features/cart';
import { clearOrder } from '@/store/features/order';
import { AppDispatch, RootState } from '@/store/store';
import { Copy, FileCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export type TCouponObj = {
  type: string;
  discount: number;
};

const Checkout = () => {
  const [show, setShow] = useState(false);
  const [copy, setCopy] = useState(false);
  const [createOrder] = useCreateOrderMutation();
  const { toast } = useToast();
  const router = useRouter();
  const order = useSelector((state: RootState) => state.order);
  const dispatch = useDispatch<AppDispatch>();
  const [trackingId, setTrackingId] = useState('');
  const [loading, setLoading] = useState(false);

  const handleOrder = async () => {
    const { address, district, division, email, line_items, name, phone, sub_district } = order;
    if (!name || !email || !phone || !division || !district || !sub_district || !address) {
      toast({
        title: 'Error',
        description: 'Please fill all the fields & save the address',
      });
      return;
    }
    if (line_items.length === 0) {
      toast({
        title: 'Error',
        description: 'Please add some products to cart',
      });
      return;
    }
    try {
      setLoading(true);
      const { data } = await createOrder({
        ...order,
        division: DIVISIONS.find((d) => d.value === order.division)?.text || '',
        district: DISTRICTS[order.division].find((d) => d.value === order.district)?.text || '',
        sub_district:
          UPAZILLAS[order.district].find((d) => d.value === order.sub_district)?.text || '',
      });

      if (data) {
        if (data.data.tracking_id) {
          toast({
            title: 'Order Placed',
            description: 'Your order has been placed successfully',
          });
          setTrackingId(data.data.tracking_id.toString());
          setLoading(false);
          setShow(true);
          dispatch(clearCart());
          dispatch(clearOrder());
        }
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (getDataSessionStorage('carts')?.length === 0) {
      toast({
        title: 'Cart is Empty',
        description: 'Please add some products to cart',
      });
      router.push('/cakes');
    }
  }, [toast, router]);

  return (
    <>
      <main>
        <Container>
          <TypographyH3 className='mt-3'>
            <Gradient>Checkout</Gradient>
          </TypographyH3>
          {/* main wrapper  */}
          <div className='my-8'>
            <ProductsTable />
            <div className='mx-auto mt-10 w-full space-y-10 md:max-w-[768px]'>
              <CustomInstruction />
              <CouponCode />
              <ShippingAddress />
              <PaymentInformation />
              <Button
                variant={'default'}
                loading={loading}
                disabled={loading}
                className='mx-auto max-w-fit'
                onClick={handleOrder}
              >
                Place Order
              </Button>
            </div>
          </div>
        </Container>
      </main>
      <Dialog
        open={show}
        onOpenChange={() => {
          setShow(!show);
          router.push('/track-order');
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className='text-left'>Here your order tracking ID</DialogTitle>
            <DialogDescription className='text-left'>
              <TypographyLarge className='flex items-center gap-2'>
                {trackingId}{' '}
                {copy ? (
                  <FileCheck
                    className='cursor-pointer'
                    onClick={() => {
                      copyToClipboard(trackingId);
                    }}
                  />
                ) : (
                  <Copy
                    className='cursor-pointer'
                    onClick={() => {
                      setCopy(true);
                      copyToClipboard(trackingId);
                    }}
                  />
                )}{' '}
              </TypographyLarge>
              <span className='text-left'>
                Copy or save this tracking ID for future reference. You can track your order with
                this tracking ID.
              </span>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Checkout;
