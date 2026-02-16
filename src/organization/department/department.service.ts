import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { GetParamDto } from '../../common/schemas/get-param.schema';
import now from '../../utils/dates/now';
import { Department } from './entities/department.entity';
import { CreateDepartmentDto } from './schemas/create-department.schema';
import { DepartmentParamDto } from './schemas/department-param.schema';
import { UpdateDepartmentDto } from './schemas/update-department.schema';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private readonly department: Repository<Department>,
  ) {}

  // Create department
  async create(
    organizationId: GetParamDto,
    departmentDto: CreateDepartmentDto,
  ): Promise<CreateDepartmentDto> {
    // Create department object
    const newDepartment: Department = this.department.create({
      ...departmentDto,
      organizationId: organizationId.id,
      createdAt: now(),
      updatedAt: now(),
    });
    // Saves into the database
    return await this.department.save(newDepartment);
  }

  async update(
    departmentParam: DepartmentParamDto,
    departmentDto: UpdateDepartmentDto,
  ): Promise<UpdateDepartmentDto> {
    // Create department object
    const updateDepartment: Department | null = await this.department.findOne({
      where: {
        id: departmentParam.departmentId,
      },
    });

    if (!updateDepartment) {
      throw new NotFoundException(
        `Department with ID ${departmentParam.departmentId} not found`,
      );
    }

    // Merge the updates
    Object.assign(updateDepartment, departmentDto);

    // Saves into the database
    return this.department.save(updateDepartment);
  }
}
