import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Member } from '../../organization/member/entities/member.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  sub: string;

  @Column()
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  profileUrl: string;

  @Column()
  isVerified: boolean;

  @Column({ type: 'timestamp' })
  createdAt: Date;

  @Column({ type: 'timestamp' })
  updatedAt: Date;

  @OneToMany(() => Member, (member: Member) => member.user, {
    cascade: true,
  })
  members?: Member[];
}
