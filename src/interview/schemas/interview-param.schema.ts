import z, { ZodType } from 'zod';

export const interviewParamSchema: ZodType<{
  id: string;
  interviewId: string;
}> = z.object({
  id: z.uuid(),
  interviewId: z.uuid(),
});

export type InterviewParamDto = z.infer<typeof interviewParamSchema>;
