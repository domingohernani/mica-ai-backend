import z, { ZodType } from 'zod';

export const getOrganizationSchema: ZodType<{
  _id: string;
  name: string;
  createdBy: object;
  createdAt: Date;
  updatedAt: Date;
}> = z.object({
  _id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid ObjectId'),
  name: z.string(),
  createdBy: z.object(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type GetOrganizationDto = z.infer<typeof getOrganizationSchema>;
