import { z } from 'zod';

export const schema = z.object({
  name: z.string().nonempty(),
  description: z.string().nonempty(),
  price: z.coerce.number().positive(),
  discount: z.coerce.number().nonnegative(),
  category: z.string().nonempty(),
  variants: z
    .array(
      z.object({
        name: z.string().nonempty(),
        price: z.coerce.number().positive(),
      }),
    )
    .nonempty(),
});
export const schemaUpdate = z.object({
  name: z.string().nonempty(),
  description: z.string().nonempty(),
  price: z.coerce.number().positive(),
  discount: z.coerce.number().nonnegative(),
  category: z.string().nonempty(),
  variants: z
    .array(
      z.object({
        _id: z.string().nonempty().optional(),
        name: z.string().nonempty(),
        price: z.coerce.number().positive(),
      }),
    )
    .nonempty(),
});

export type FormType = z.infer<typeof schema>;
export type FormTypeUpdate = z.infer<typeof schemaUpdate>;
