import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DepartmentController } from './department.controller';
import { DepartmentService } from './department.service';
import { Department } from './entities/department.entity';

@Module({
  providers: [DepartmentService],
  controllers: [DepartmentController],
  exports: [],
  imports: [TypeOrmModule.forFeature([Department])],
})
export class DepartmentModule {}
