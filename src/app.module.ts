import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LlmModule } from './llm/llm.module';
import { InterviewModule } from './interview/interview.module';

@Module({
  imports: [LlmModule, InterviewModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
