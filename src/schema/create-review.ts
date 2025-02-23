import { z } from 'zod';

export const schema = z.object({
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
