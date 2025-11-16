import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LlmModule } from 'src/llm/llm.module';
import { TtsModule } from 'src/tts/tts.module';

import { Interview } from '../entities/interview.entity';
import { InterviewModule } from '../interview.module';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';

@Module({
  controllers: [QuestionController],
  providers: [QuestionService],
  imports: [
    TypeOrmModule.forFeature([Interview]),
    forwardRef(() => InterviewModule),
    LlmModule,
    TtsModule,
  ],
})
export class QuestionModule {}
