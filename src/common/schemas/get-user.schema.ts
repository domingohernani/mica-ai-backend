import z, { ZodType } from 'zod';

export const getUserSchema: ZodType<{
  _id: string;
  sub: string;
  email: string;
  firstName: string;
  lastName: string;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}> = z.object({
  _id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid ObjectId'),
  sub: z.string(),

  email: z.email(),
  firstName: z.string(),
  lastName: z.string(),
  isVerified: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type GetUserDto = z.infer<typeof getUserSchema>;
