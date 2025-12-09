import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LlmModule } from '../../infrastructure/llm/llm.module';
import { SpeechModule } from '../../infrastructure/speech/speech.module';
import { StorageModule } from '../../infrastructure/storage/storage.module';
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
    SpeechModule,
    StorageModule,
  ],
})
export class QuestionModule {}
