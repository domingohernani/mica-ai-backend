import z, { ZodType } from 'zod';

export const getUserSchema: ZodType<{
  _id: string;
  email: string;
  userName: string;
  role?: string;
}> = z.object({
  _id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid ObjectId'),
  email: z.email(),
  userName: z.string(),
  role: z.string().optional(),
});

export type GetUserDto = z.infer<typeof getUserSchema>;
