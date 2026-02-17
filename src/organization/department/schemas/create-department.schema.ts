import z, { ZodType } from 'zod';

export const createDepartmentSchema: ZodType<{
  name: string;
  createdBy: string;
}> = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  createdBy: z.uuid(),
});

export type CreateDepartmentDto = z.infer<typeof createDepartmentSchema>;
