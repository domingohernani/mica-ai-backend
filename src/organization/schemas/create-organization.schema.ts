import z, { ZodType } from 'zod';

export const createOrganizationSchema: ZodType<{
  name: string;
}> = z.object({
  name: z.string(),
});

export type CreateOrganizationDto = z.infer<typeof createOrganizationSchema>;
