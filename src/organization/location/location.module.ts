import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Location } from './entities/location.entity';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';

@Module({
  providers: [LocationService],
  controllers: [LocationController],
  exports: [],
  imports: [TypeOrmModule.forFeature([Location])],
})
export class LocationModule {}
