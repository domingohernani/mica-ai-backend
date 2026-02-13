import { Conversation } from './entities/conversation.entity';

export class InterviewDto {
  readonly id: string;
  readonly conversations: Conversation[];
  readonly isDone: boolean;
  readonly finalMessage: string;
  readonly finalTtsSignedUrl?: string;
}
