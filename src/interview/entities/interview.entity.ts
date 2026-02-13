import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Conversation } from './conversation.entity';

@Entity()
export class Interview {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ default: false })
  isDone: boolean;

  @Column({ default: '' })
  finalMessage: string;

  // Reference to Conversation entity
  @OneToMany(
    () => Conversation,
    (conversations: Conversation) => conversations.interview,
  )
  conversations: Conversation[];
}
