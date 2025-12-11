import z, { ZodType } from 'zod';

export const createOrganizationSchema: ZodType<{
  name: string;
  createdBy: string;
}> = z.object({
  name: z.string(),
  createdBy: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid ObjectId'),
});

export type CreateOrganizationDto = z.infer<typeof createOrganizationSchema>;
