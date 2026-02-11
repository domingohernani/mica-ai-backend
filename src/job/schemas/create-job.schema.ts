import z, { ZodType } from 'zod';

export const createJobSchema: ZodType<{
  organizationId: string;
  title: string;
  description: string;
  createdBy: string;
}> = z.object({
  organizationId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid ObjectId'),
  title: z.string(),
  description: z.string(),
  createdBy: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid ObjectId'),
});

export type CreateJobDto = z.infer<typeof createJobSchema>;
