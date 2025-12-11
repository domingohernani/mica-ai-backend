import { Body, Controller, Post, UsePipes } from '@nestjs/common';

import { ZodValidationPipe } from './../common/pipes/zod-validation.pipe';
import { Organization } from './entities/organization.entity';
import { OrganizationService } from './organization.service';
import type { CreateOrganizationDto } from './schemas/create-organization.schema';
import { createOrganizationSchema } from './schemas/create-organization.schema';

@Controller('organizations')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createOrganizationSchema))
  async create(
    @Body() organizationDto: CreateOrganizationDto,
  ): Promise<Organization> {
    return await this.organizationService.create(organizationDto);
  }
}
