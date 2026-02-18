import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import now from '../../utils/dates/now';
import { Department } from './entities/department.entity';
import { CreateDepartmentDto } from './schemas/create-department.schema';
import { DeleteDepartmentDto } from './schemas/delete-department.schema';
import { DepartmentParamDto } from './schemas/department-param.schema';
import { GetAllDepartmentDto } from './schemas/get-all-departments.schema';
import { GetDepartmentsParamDto } from './schemas/get-departments-params.schema';
import { UpdateDepartmentDto } from './schemas/update-department.schema';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private readonly department: Repository<Department>,
  ) {}

  async findAll(
    organizationDto: GetDepartmentsParamDto,
  ): Promise<GetAllDepartmentDto> {
    // Find all departments using organizationId
    const departments: Department[] | null = await this.department.find({
      where: {
        organizationId: organizationDto.organizationId, // Fnd by orgnizationId
      },
      order: {
        updatedAt: 'DESC',
      },
    });

    return departments;
  }

  // Create department
  async create(
    organizationId: GetDepartmentsParamDto,
    departmentDto: CreateDepartmentDto,
  ): Promise<CreateDepartmentDto> {
    // Create department object
    const newDepartment: Department = this.department.create({
      ...departmentDto,
      organizationId: organizationId.organizationId,
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
        id: departmentParam.departmentId, // Find by id
        organizationId: departmentParam.organizationId, // Fnd by orgnizationId
      },
    });

    if (!updateDepartment) {
      throw new NotFoundException(
        `Department with ID ${departmentParam.departmentId} under organization ${departmentParam.organizationId} was not found.`,
      );
    }

    // Merge the updates
    Object.assign(updateDepartment, departmentDto);

    // Saves into the database
    return this.department.save(updateDepartment);
  }

  async delete(
    departmentParam: DepartmentParamDto,
  ): Promise<DeleteDepartmentDto> {
    // Find the departmenta using the id and organization fields
    const department: Department | null = await this.department.findOne({
      where: {
        id: departmentParam.departmentId,
        organizationId: departmentParam.organizationId,
      },
    });

    if (!department) {
      throw new NotFoundException(
        `Department with ID ${departmentParam.departmentId} under organization ${departmentParam.organizationId} was not found.`,
      );
    }

    // Delete
    await this.department.remove(department);

    return department;
  }
}
