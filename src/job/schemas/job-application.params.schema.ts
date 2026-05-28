import z, { ZodType } from 'zod';

export const jobApplicationParamSchema: ZodType<{
  id: string;
  applicationId: string;
}> = z.object({
  id: z.uuid(),
  applicationId: z.uuid(),
});

export type JobApplicationParamsDto = z.infer<typeof jobApplicationParamSchema>;
