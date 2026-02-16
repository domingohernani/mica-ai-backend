import { Body, Controller, Param, Post } from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';

import { ZodValidationPipe } from '../../common/pipes/zod-validation.pipe';
import {
  type GetParamDto,
  getParamSchema,
} from '../../common/schemas/get-param.schema';
import { DepartmentService } from './department.service';
import {
  type CreateDepartmentDto,
  createDepartmentSchema,
} from './schemas/create-department.schema';

@Controller('organizations/:id')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Public()
  @Post('departments')
  async create(
    @Param(new ZodValidationPipe(getParamSchema))
    organizationId: GetParamDto,
    @Body(new ZodValidationPipe(createDepartmentSchema))
    departmentDto: CreateDepartmentDto,
  ): Promise<CreateDepartmentDto> {
    return await this.departmentService.create(organizationId, departmentDto);
  }
}
