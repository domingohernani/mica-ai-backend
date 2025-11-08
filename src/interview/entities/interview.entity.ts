import { ObjectId as MongoObjectId } from 'mongodb';
import {
  BeforeInsert,
  Column,
  Entity,
  ObjectId,
  ObjectIdColumn,
} from 'typeorm';

import { QuestionDto } from '../question/question.dto';

@Entity()
export class Interview {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  conversation: {
    _id: ObjectId;
    originalQuestion: string;
    aiQuestion: string;
    answer: string;
    isAnswered: boolean;
  }[];

  @Column({ default: false })
  isDone: boolean;

  @BeforeInsert()
  generateConversation(): void {
    if (this.conversation) {
      this.conversation = this.conversation.map((convo: QuestionDto) => ({
        ...convo,
        _id: convo._id || new MongoObjectId(),
      }));
    }
  }
}
