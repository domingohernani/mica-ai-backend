import z, { ZodType } from 'zod';

export const createUserSchema: ZodType<{
  sub: string;
  email: string;
  firstName: string;
  lastName: string;
  profileUrl: string;
  isVerified: boolean;
}> = z.object({
  sub: z.string(),
  email: z.email(),
  firstName: z.string(),
  lastName: z.string(),
  profileUrl: z.url(),
  isVerified: z.boolean(),
  // createdAt: z
  //   .string()
  //   .default('')
  //   .refine((val: string) => !isNaN(Date.parse(val)), {
  //     message: 'Invalid ISO 8601 datetime string',
  //   }),
  // updatedAt: z
  //   .string()
  //   .default('')
  //   .refine((val: string) => !isNaN(Date.parse(val)), {
  //     message: 'Invalid ISO 8601 datetime string',
  //   }),
});

export type CreateUserDto = z.infer<typeof createUserSchema>;
