import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Member } from './entities/member.entity';
import { Organization } from './entities/organization.entity';
import { OrganizationController } from './organization.controller';
import { OrganizationService } from './organization.service';

@Module({
  providers: [OrganizationService],
  controllers: [OrganizationController],
  exports: [],
  imports: [TypeOrmModule.forFeature([Organization, Member])],
})
export class OrganizationModule {}
