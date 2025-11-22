import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Interview } from './interview/entities/interview.entity';
import { InterviewModule } from './interview/interview.module';
import { LlmModule } from './llm/llm.module';
import { SpeechModule } from './speech/speech.module';
import { StorageModule } from './storage/storage.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env.MONGODB_URI,
      synchronize: true, // TODO: remove in production
      entities: [Interview],
    }),
    LlmModule,
    InterviewModule,
    SpeechModule,
    StorageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
