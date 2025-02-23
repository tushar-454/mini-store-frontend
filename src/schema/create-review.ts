import { z } from 'zod';

export const schema = z.object({
  rating: z.coerce
    .number()
    .min(1, {
      message: 'Rating should be between 1 and 5',
    })
    .max(5, {
      message: 'Rating should be between 1 and 5',
    }),
  comment: z
    .string()
    .nonempty({
      message: 'Comment is required',
    })
    .max(200, {
      message: 'Comment should not exceed 200 characters',
    }),
});

export type FormType = z.infer<typeof schema>;
