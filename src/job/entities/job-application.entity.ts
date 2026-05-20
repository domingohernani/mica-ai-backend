import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @Column({ type: 'timestamp' })
  appliedAt: Date;

  @Column({ type: 'timestamp' })
  updatedAt: Date;

  // This represent the organizationId
  @ManyToOne(() => Job, (job: Job) => job.applications)
  @JoinColumn({ name: 'jobId' })
  job?: Job;

  @Column('uuid')
  jobId: string;
}
