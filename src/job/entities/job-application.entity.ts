import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ApplicationStatus } from '../../interview/constants/application-status';
import { Organization } from '../../organization/entities/organization.entity';
import { Job } from './job.entity';

@Entity()
export class JobApplication {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ type: 'text', nullable: true })
  middleName: string | null;

  @Column({ type: 'date' })
  dateOfBirth: Date;

  @Column()
  email: string;

  @Column()
  phoneNumber: string;

  @Column({ type: 'text' })
  currentAddress: string;

  @Column({ type: 'text', nullable: true })
  currentJobTitle: string | null;

  @Column({ type: 'text', nullable: true })
  currentCompany: string | null;

  @Column({ type: 'int' })
  yearsOfExperience: number;

  @Column({ type: 'int' })
  expectedSalary: number;

  @Column()
  availability: string;

  @Column({ type: 'text', nullable: true })
  professionalLinks: string | null;

  @Column()
  resumePath: string;

  @Column({
    type: 'enum',
    enum: ApplicationStatus,
    default: ApplicationStatus.NEW_APPLICATION,
  })
  status: ApplicationStatus;

  @Column({ type: 'timestamp' })
  appliedAt: Date;

  @Column({ type: 'timestamp' })
  updatedAt: Date;

  // This represent the jobId
  @ManyToOne(() => Job, (job: Job) => job.applications)
  @JoinColumn({ name: 'jobId' })
  job?: Job;

  @Column('uuid')
  jobId: string;

  // This represent the jobId
  @ManyToOne(
    () => Organization,
    (organization: Organization) => organization.applications,
  )
  @JoinColumn({ name: 'organizationId' })
  organization?: Job;

  @Column('uuid')
  organizationId: string;
}
