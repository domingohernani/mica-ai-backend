import { forwardRef, Module } from '@nestjs/common';
import { LlmModule } from 'src/llm/llm.module';

import { InterviewModule } from '../interview.module';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';

@Module({
  controllers: [QuestionController],
  providers: [QuestionService],
  imports: [forwardRef(() => InterviewModule), LlmModule],
})
export class QuestionModule {}
