import z, { ZodType } from 'zod';

export const createJobSchema: ZodType<{
  organizationId: string;
  position: string;
  description: string;
  createdBy: string;
}> = z.object({
  organizationId: z.uuid(),
  position: z.string().min(1, 'Position is required').max(100),
  description: z.string(),
  createdBy: z.uuid(),
});

export type CreateJobDto = z.infer<typeof createJobSchema>;
