import z, { ZodType } from 'zod';

export const getOrganizationSchema: ZodType<{
  id: string;
  name: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}> = z.object({
  id: z.uuid(),
  name: z.string(),
  createdBy: z.uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type GetOrganizationDto = z.infer<typeof getOrganizationSchema>;
