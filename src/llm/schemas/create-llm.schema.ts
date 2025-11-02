import z from 'zod';

export const createLlmSchema = z.object({
  model: z.string(),
  prompt: z.string(),
  stream: z.boolean(),
});

export type CreateLlmDto = z.infer<typeof createLlmSchema>;
