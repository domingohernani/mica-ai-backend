import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
} from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';

import { ZodValidationPipe } from '../../common/pipes/zod-validation.pipe';
import { DepartmentService } from './department.service';
import {
  type CreateDepartmentDto,
  createDepartmentSchema,
} from './schemas/create-department.schema';
import { DeleteDepartmentDto } from './schemas/delete-department.schema';
import {
  type DepartmentParamDto,
  departmentParamSchema,
} from './schemas/department-param.schema';
import { GetAllDepartmentDto } from './schemas/get-all-departments.schema';
import {
  type GetDepartmentsParamDto,
  getDepartmentsParamSchema,
} from './schemas/get-departments-params.schema';
import {
  type UpdateDepartmentDto,
  updateDepartmentSchema,
} from './schemas/update-department.schema';

@Controller('organizations/:organizationId')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Public()
  @Get('departments')
  @UsePipes(new ZodValidationPipe(getDepartmentsParamSchema))
  async findAll(
    @Param() organizationDto: GetDepartmentsParamDto,
  ): Promise<GetAllDepartmentDto> {
    return await this.departmentService.findAll(organizationDto);
  }

  @Public()
  @Post('departments')
  async create(
    @Param(new ZodValidationPipe(getDepartmentsParamSchema))
    organizationDto: GetDepartmentsParamDto,
    @Body(new ZodValidationPipe(createDepartmentSchema))
    departmentDto: CreateDepartmentDto,
  ): Promise<CreateDepartmentDto> {
    return await this.departmentService.create(organizationDto, departmentDto);
  }

  @Public()
  @Patch('departments/:departmentId')
  async update(
    @Param(new ZodValidationPipe(departmentParamSchema))
    params: DepartmentParamDto,
    @Body(new ZodValidationPipe(updateDepartmentSchema))
    departmentDto: UpdateDepartmentDto,
  ): Promise<UpdateDepartmentDto> {
    return await this.departmentService.update(params, departmentDto);
  }

  @Public()
  @Delete('departments/:departmentId')
  async delete(
    @Param(new ZodValidationPipe(departmentParamSchema))
    departmentParam: DepartmentParamDto,
  ): Promise<DeleteDepartmentDto> {
    return await this.departmentService.delete(departmentParam);
  }
}
