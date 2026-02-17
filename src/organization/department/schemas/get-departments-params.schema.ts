import z, { ZodType } from 'zod';

export const getDepartmentsParamSchema: ZodType<{
  organizationId: string;
}> = z.object({
  organizationId: z.uuid(),
});

export type GetDepartmentsParamDto = z.infer<typeof getDepartmentsParamSchema>;
