import z, { ZodType } from 'zod';

export const scheduleInterviewSchema: ZodType<{
  compatibilityScore: number;
  matchedRequirements: string[];
  missingCoreRequirements: string[];
  alignmentRationale: string;
}> = z.object({
  compatibilityScore: z.number().min(0).max(100),
  matchedRequirements: z.array(z.string()),
  missingCoreRequirements: z.array(z.string()),
  alignmentRationale: z.string().min(1, 'Alignment rationale is required'),
});

export type ScheduleInterviewDto = z.infer<typeof scheduleInterviewSchema>;
