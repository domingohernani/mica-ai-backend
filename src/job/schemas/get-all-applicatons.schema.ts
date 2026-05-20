import z, { ZodType } from 'zod';

export type ApplicantDetails = {
  firstName: string;
  lastName: string;
  middleName: string | null;
  dateOfBirth: Date;
  email: string;
  phoneNumber: string;
  currentAddress: string;
  currentJobTitle: string | null;
  currentCompany: string | null;
  yearsOfExperience: number;
  expectedSalary: number;
  availability: string;
  professionalLinks: string | null;
};

export const getAllApplicationSchema: ZodType<ApplicantDetails[]> = z.array(
  z.object({
    firstName: z.string(),
    lastName: z.string(),
    middleName: z.string().nullable(),
    dateOfBirth: z.date(),
    email: z.email(),
    phoneNumber: z.string(),
    currentAddress: z.string(),
    currentJobTitle: z.string().nullable(),
    currentCompany: z.string().nullable(),
    yearsOfExperience: z.number(),
    expectedSalary: z.number(),
    availability: z.string(),
    professionalLinks: z.string().nullable(),
  }),
);

export type GetAllApplicationDto = z.infer<typeof getAllApplicationSchema>;
