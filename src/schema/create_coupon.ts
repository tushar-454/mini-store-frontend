import { z } from 'zod';

export const schema = z.object({
  code: z.string().nonempty(),
  type: z.enum(['percentage', 'flat']),
  discount: z.coerce.number().positive().nonnegative(),
  quantity: z.coerce.number().nonnegative(),
  minprice: z.coerce.number().nonnegative(),
  startAt: z.date().optional(),
  expireAt: z.date().refine(
    (expireAt) => {
      return expireAt.getTime() > new Date().getTime();
    },
    { message: 'Expire date must be greater than today' },
  ),
});

export type FormType = z.infer<typeof schema>;
