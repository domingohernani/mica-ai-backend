import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from '../../../user/entities/user.entity';
import { Organization } from '../../entities/organization.entity';

@Entity()
export class Member {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  role: string;

  @Column({ type: 'timestamp' })
  joinedAt: Date;

  @ManyToOne(
    () => Organization,
    (organization: Organization) => organization.members,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'organizationId' })
  organization?: Organization;

  @Column('uuid')
  organizationId: string;

  @ManyToOne(() => User, (user: User) => user.members, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user?: User;

  @Column({ type: 'uuid' })
  userId: string;
}
