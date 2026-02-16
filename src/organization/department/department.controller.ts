import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
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
import {
  type DepartmentParamDto,
  departmentParamSchema,
} from './schemas/department-param.schema';
import {
  type UpdateDepartmentDto,
  updateDepartmentSchema,
} from './schemas/update-department.schema';

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

  @Public()
  @Patch('departments/:departmentId')
  async update(
    @Param(new ZodValidationPipe(departmentParamSchema)) // ← No parameter name
    params: DepartmentParamDto, // ← Gets all params as object
    @Body(new ZodValidationPipe(updateDepartmentSchema))
    departmentDto: UpdateDepartmentDto,
  ): Promise<UpdateDepartmentDto> {
    return await this.departmentService.update(params, departmentDto);
  }
}
