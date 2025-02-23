import { z } from 'zod';

export const schema = z.object({
  label: z.string().nonempty(),
  width: z.coerce.number().int().positive(),
  height: z.coerce.number().int().positive(),
});

export type FormType = z.infer<typeof schema>;
