import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Interview } from './interview.entity';

@Entity()
export class Conversation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  originalQuestion: string;

  @Column()
  aiQuestion: string;

  @Column('text')
  answer: string;

  @Column({ default: false })
  isAnswered: boolean;

  @ManyToOne(() => Interview, (interview: Interview) => interview.conversations)
  interview: Interview;
}
