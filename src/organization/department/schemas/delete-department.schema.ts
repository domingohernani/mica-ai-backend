import z, { ZodType } from 'zod';

export const deleteDepartmentSchema: ZodType<{
  id: string;
  name: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  organizationId: string;
}> = z.object({
  id: z.uuid(),
  name: z.string().min(1, 'Name is required').max(100),
  createdBy: z.uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
  organizationId: z.uuid(),
});

export type DeleteDepartmentDto = z.infer<typeof deleteDepartmentSchema>;
