import { z } from 'zod';

export const schema = z.object({
  name: z.string().nonempty(),
});

export const schemaUpdate = z.object({
  name: z.string().optional(),
});

export type FormType = z.infer<typeof schema>;
export type FormTypeUpdate = z.infer<typeof schemaUpdate>;
