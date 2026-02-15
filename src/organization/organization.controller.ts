import { Body, Controller, Get, Param, Post, UsePipes } from '@nestjs/common';

import { User } from '../common/decorators/user.decorator';
import type { GetUserDto } from '../common/schemas/get-user.schema';
import { ZodValidationPipe } from './../common/pipes/zod-validation.pipe';
import type { GetParamDto } from './../common/schemas/get-param.schema';
import { getParamSchema } from './../common/schemas/get-param.schema';
import { Organization } from './entities/organization.entity';
import { OrganizationService } from './organization.service';
import type { CreateOrganizationDto } from './schemas/create-organization.schema';
import { createOrganizationSchema } from './schemas/create-organization.schema';
import type { GetOrganizationDto } from './schemas/get-organization.schema';

@Controller('organizations')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  // Creation of organization
  @Post()
  async create(
    @Body(new ZodValidationPipe(createOrganizationSchema))
    organizationDto: CreateOrganizationDto,
    @User() user: GetUserDto,
  ): Promise<Organization> {
    return await this.organizationService.create(user.id, organizationDto);
  }

  // Get the organizations of the user
  @Get('user/:id')
  @UsePipes(new ZodValidationPipe(getParamSchema))
  async findByUserId(
    @Param() organizationDto: GetParamDto,
  ): Promise<GetOrganizationDto[]> {
    return await this.organizationService.findByUserId(organizationDto);
  }
}
