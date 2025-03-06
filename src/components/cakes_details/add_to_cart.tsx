'use client';
import { TProduct } from '@/api/product';
import { useToast } from '@/hooks/use-toast';
import { addCartItem, updateCartItem } from '@/store/features/cart';
import { AppDispatch, RootState } from '@/store/store';
import { ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Taka } from '../shared/taka';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

type AddToCartProps = {
  cake: TProduct;
};

const AddToCart = ({ cake }: AddToCartProps) => {
  const { toast } = useToast();
  const dispatch = useDispatch<AppDispatch>();
  const [variantId, setVariantId] = useState('');
  const carts = useSelector((state: RootState) => state.cart.carts);
  const selectedImage = useSelector((state: RootState) => state.global.selectedImage);

  const addtocart = () => {
    const variant = cake.variants.find((variant) => variant._id === variantId);
    if (!variant) {
      toast({
        title: 'Select Variant',
        description: 'Please select a variant to add to cart',
      });
      return;
    }
    const cartExist = carts.find(
      (cart) =>
        cart.product_id === cake._id &&
        cart.variant._id === variant._id &&
        cart.image === selectedImage,
    );
    if (cartExist) {
      dispatch(updateCartItem({ id: cartExist._id, type: 'increment' }));
      toast({
        title: 'Already in cart. Incremented quantity',
        description: `${cake.name} - ${variant.name} incremented in cart`,
      });
      return;
    }
    const cart = {
      _id: crypto.randomUUID(),
      product_id: cake._id,
      image: selectedImage,
      name: cake.name,
      category: cake.category,
      variant,
      price: variant.price,
      discount: cake.discount,
      quantity: 1,
      totalPrice: variant.price,
    };
    dispatch(addCartItem(cart));
    toast({
      title: 'Added to cart',
      description: `${cake.name} - ${variant.name} added to cart`,
    });
  };

  return (
    <>
      <div className='mb-6'>
        <h3 className='mb-2 text-lg font-semibold'>Variants:</h3>
        <div className='flex flex-wrap gap-3'>
          <Select onValueChange={(value) => setVariantId(value)}>
            <SelectTrigger className='min-w-[180px] sm:max-w-fit'>
              <SelectValue placeholder='Select a variant' />
            </SelectTrigger>
            <SelectContent>
              {cake.variants.map((variant) => (
                <SelectItem key={variant._id} value={variant._id!}>
                  {variant.name}
                  {variant.price && ` - ${variant.price}`} <Taka size={12} />
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className='mb-6 flex space-x-4'>
        <Button variant={'default'} onClick={addtocart}>
          <span className='flex items-center gap-2'>
            <ShoppingCart />
            Add to Cart
          </span>
        </Button>
      </div>
    </>
  );
};

export default AddToCart;
