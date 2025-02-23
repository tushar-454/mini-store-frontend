'use client';

import { useCategoryQuery } from '@/api/category';
import { setOpenFilter } from '@/store/features/globalReducer';
import { AppDispatch, RootState } from '@/store/store';
import { Minus, Plus } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FilterCategorySkeleton } from '../skeleton/filter_category';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import Gradient from '../ui/gradient';
import { Input } from '../ui/input';
import { Separator } from '../ui/separator';
import { TypographyH3, TypographyH4, TypographyMuted, TypographyP } from '../ui/typography';

const CakesFilter = () => {
  const dispatch = useDispatch<AppDispatch>();
  const openFilter = useSelector((state: RootState) => state.global.openFilter);
  const { data: { data: categories } = {}, isLoading, isError } = useCategoryQuery();

  const router = useRouter();
  const searchParams = useSearchParams();

  const [minPrice, setMinPrice] = useState(searchParams.get('min_price') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('max_price') || '');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.getAll('category') || [],
  );

  const updatePriceFilter = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (minPrice) {
      params.set('min_price', minPrice);
    } else {
      params.delete('min_price');
    }

    if (maxPrice) {
      params.set('max_price', maxPrice);
    } else {
      params.delete('max_price');
    }

    router.push(`?${params.toString()}`);
  }, [minPrice, maxPrice, router, searchParams]);

  useEffect(() => {
    const timer = setTimeout(updatePriceFilter, 500);
    return () => clearTimeout(timer);
  }, [minPrice, maxPrice, updatePriceFilter]);

  // Handle category selection
  const handleCategoryChange = (category: string) => {
    let updatedCategories = [...selectedCategories];

    if (updatedCategories.includes(category)) {
      updatedCategories = updatedCategories.filter((cat) => cat !== category);
    } else {
      updatedCategories.push(category);
    }

    setSelectedCategories(updatedCategories);

    const params = new URLSearchParams(searchParams.toString());
    params.delete('category');

    updatedCategories.forEach((cat) => params.append('category', cat));

    router.push(`?${params.toString()}`);
  };

  let placeholder;
  if (isLoading && !isError) {
    placeholder = <FilterCategorySkeleton />;
  }

  if (!isLoading && isError) {
    placeholder = (
      <TypographyP className='text-center text-red-500'>Failed to load categories</TypographyP>
    );
  }

  if (!isLoading && !isError && Array.isArray(categories) && categories.length === 0) {
    placeholder = <TypographyMuted className='text-center'>No categories found</TypographyMuted>;
  }

  return (
    <div
      className={`max_price-w-[350px] absolute z-50 rounded-2xl border bg-white p-5 transition-all duration-300 lg:static lg:z-auto ${
        openFilter ? 'left-0 top-[90px]' : '-left-[50rem]'
      }`}
    >
      <span className='flex items-center justify-between'>
        <TypographyH3>
          <Gradient>Cakes Filter</Gradient>
        </TypographyH3>
        {openFilter && (
          <Button variant={'destructive'} onClick={() => dispatch(setOpenFilter(false))}>
            <Plus className='rotate-45 cursor-pointer' />
          </Button>
        )}
      </span>
      <Separator className='my-3' />
      <div className='flex flex-col gap-5'>
        <TypographyH4>
          <Gradient>Categories</Gradient>
        </TypographyH4>
        {placeholder ? (
          placeholder
        ) : (
          <ul className='flex flex-col gap-2'>
            {Array.isArray(categories) &&
              categories.map((category) => (
                <li key={category._id} className='flex cursor-pointer items-center gap-2'>
                  <Checkbox
                    id={category.name}
                    checked={selectedCategories.includes(category.name)}
                    onCheckedChange={() => handleCategoryChange(category.name)}
                  />
                  <label htmlFor={category.name} className='cursor-pointer'>
                    {category.name}
                  </label>
                </li>
              ))}
          </ul>
        )}
      </div>
      <div className='mt-5 flex flex-col gap-5'>
        <TypographyH4>
          <Gradient>Price</Gradient>
        </TypographyH4>
        <div className='flex items-center gap-2'>
          <Input
            type='number'
            placeholder='Min'
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <Minus />
          <Input
            type='number'
            placeholder='Max'
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default CakesFilter;
