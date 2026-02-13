import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Member } from './member.entity';

@Entity()
export class Organization {
  @PrimaryGeneratedColumn()
  id?: string;

  @Column()
  name: string;

  @OneToMany(() => Member, (member: Member) => member.organization, {
    cascade: true,
  })
  members: Member[];

  @Column('uuid')
  createdBy: string;

  @Column({ type: 'timestamp' })
  createdAt: Date;

  @Column({ type: 'timestamp' })
  updatedAt: Date;
}
