import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Conversation } from './conversation.entity';

@Entity()
export class Interview {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: false })
  isDone: boolean;

  @Column({ default: '' })
  finalMessage: string;

  // Reference to Conversation entity
  @OneToMany(
    () => Conversation,
    (conversations: Conversation) => conversations.interview,
    {
      cascade: true, // This automatically saves conversations
      eager: true, // Automatically loads conversations
    },
  )
  conversations: Conversation[];
}
