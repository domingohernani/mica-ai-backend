import z, { ZodType } from 'zod';

export const createLocationSchema: ZodType<{
  name: string;
  createdBy: string;
}> = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  createdBy: z.uuid(),
});

export type CreateLocationDto = z.infer<typeof createLocationSchema>;
