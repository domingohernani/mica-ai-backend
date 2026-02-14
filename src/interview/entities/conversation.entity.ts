import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Interview } from './interview.entity';

@Entity()
export class Conversation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  originalQuestion: string;

  @Column()
  order: number;

  @Column('text', { nullable: true })
  aiQuestion: string | null;

  @Column('text', { nullable: true })
  answer: string | null;

  @Column({ default: false })
  isAnswered: boolean;

  // This represent the interviewId
  @ManyToOne(() => Interview, (interview: Interview) => interview.conversations)
  @JoinColumn({ name: 'interviewId' })
  interview?: Interview;

  @Column('uuid')
  interviewId: string;
}
