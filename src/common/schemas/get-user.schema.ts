import z, { ZodType } from 'zod';

export const getUserSchema: ZodType<{
  _id: string;
  sub: string;
  email: string;
  firstName: string;
  lastName: string;
  profileUrl: string;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}> = z.object({
  _id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid ObjectId'),
  sub: z.string(),

  email: z.email(),
  firstName: z.string(),
  lastName: z.string(),
  profileUrl: z.url(),
  isVerified: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type GetUserDto = z.infer<typeof getUserSchema>;
