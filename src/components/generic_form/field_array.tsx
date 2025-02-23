'use client';

import { ReactNode } from 'react';
import {
  ArrayPath,
  FieldValues,
  useFieldArray,
  UseFieldArrayReturn,
  useFormContext,
} from 'react-hook-form';

type FieldArrayProps<T extends FieldValues> = {
  children: (field: UseFieldArrayReturn<T, ArrayPath<T>>) => ReactNode;
  name: ArrayPath<T>;
};

export const FieldArray = <T extends FieldValues>({ children, name }: FieldArrayProps<T>) => {
  const { control } = useFormContext<T>();
  const fieldArray = useFieldArray({ control, name });

  return children(fieldArray);
};

FieldArray.displayName = 'FieldArray';
