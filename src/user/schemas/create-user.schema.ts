import z, { ZodType } from 'zod';

export const createUserSchema: ZodType<{
  sub: string;
  email: string;
  userName: string;
  isVerified: boolean;
  pictureUrl: string;
  // createdAt: string;
  // updatedAt: string;
}> = z.object({
  sub: z.string(),
  userName: z.string(),
  email: z.string(),
  isVerified: z.boolean(),
  pictureUrl: z.string(),
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
