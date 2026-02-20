import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Job } from '../../job/entities/job.entity';
import { Department } from '../department/entities/department.entity';
import { Location } from '../location/entities/location.entity';
import { Member } from '../member/entities/member.entity';

@Entity()
export class Organization {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  name: string;

  @Column('uuid')
  createdBy: string;

  @Column({ type: 'timestamp' })
  createdAt: Date;

  @Column({ type: 'timestamp' })
  updatedAt: Date;

  @OneToMany(() => Member, (member: Member) => member.organization, {
    cascade: true,
  })
  members: Member[];

  @OneToMany(
    () => Department,
    (department: Department) => department.organization,
    {
      cascade: true,
    },
  )
  departments: Department[];

  @OneToMany(() => Location, (location: Location) => location.organization, {
    cascade: true,
  })
  locations: Location[];

  @OneToMany(() => Job, (job: Job) => job.organization, {
    cascade: true,
  })
  jobs: Job[];
}
