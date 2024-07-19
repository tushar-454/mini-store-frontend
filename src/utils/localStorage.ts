import toast from 'react-hot-toast';
import { CartItemType } from '../pages/ProductDetails';
import { ProductCardType } from './../components/Product/ProductCard';

const getLocalStorage = (collection: string) => {
  const storage = localStorage.getItem(collection);
  if (storage) {
    return JSON.parse(storage);
  }
  return storage;
};

const setLocalStorage = (collection: string, data: ProductCardType) => {
  const storage = localStorage.getItem(collection);
  if (!storage) {
    const value = JSON.stringify([data]);
    localStorage.setItem(collection, value);
  } else {
    const parseStorage = JSON.parse(storage);
    const isExists = parseStorage.find(
      (product: ProductCardType) => product._id === data._id,
    );
    if (isExists) {
      const filterWishLists = parseStorage.filter(
        (product: ProductCardType) => product._id !== data._id,
      );
      const newStoreData = JSON.stringify(filterWishLists);
      localStorage.setItem(collection, newStoreData);
      toast.success('Remove Successfully');
      return;
    }
    const newStoreData = JSON.stringify([...parseStorage, data]);
    localStorage.setItem(collection, newStoreData);
    toast.success('Added Successfully');
  }
};

const setCartLocalStorage = (collection: string, data: CartItemType) => {
  const storage = localStorage.getItem(collection);
  if (!storage) {
    const value = JSON.stringify([data]);
    localStorage.setItem(collection, value);
  } else {
    const parseStorage = JSON.parse(storage);
    const isExists = parseStorage.find((product: CartItemType) => {
      if (
        product.color === data.color &&
        product.price === data.price &&
        product.size === data.size
      ) {
        return true;
      }
    });
    if (isExists) {
      const filterCarts = parseStorage.filter((product: CartItemType) => {
        if (
          product.color !== data.color &&
          product.price !== data.price &&
          product.size !== data.size
        ) {
          return true;
        }
      });
      const newStoreData = JSON.stringify(filterCarts);
      localStorage.setItem(collection, newStoreData);
      toast.success('Remove Successfully');
      return;
    }
    const newStoreData = JSON.stringify([...parseStorage, data]);
    localStorage.setItem(collection, newStoreData);
    toast.success('Added Successfully');
  }
};

export { getLocalStorage, setCartLocalStorage, setLocalStorage };
