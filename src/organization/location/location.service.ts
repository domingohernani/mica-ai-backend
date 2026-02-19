import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import now from '../../utils/dates/now';
import { Location } from './entities/location.entity';
import { CreateLocationDto } from './schemas/create-location.schema';
import { DeleteLocationDto } from './schemas/delete-location.schema';
import { GetAllLocationsDto } from './schemas/get-all-locations.schema';
import { GetLocationsParamDto } from './schemas/get-locations-params.schema';
import { LocationParamDto } from './schemas/location-param.schema';
import { UpdateLocationDto } from './schemas/update-location.schema';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private readonly location: Repository<Location>,
  ) {}

  async findAll(
    locationDto: GetLocationsParamDto,
  ): Promise<GetAllLocationsDto> {
    // Find all locations using locationId
    const locations: Location[] | null = await this.location.find({
      where: {
        organizationId: locationDto.organizationId, // Fnd by orgnizationId
      },
      order: {
        updatedAt: 'DESC',
      },
    });

    return locations;
  }

  // Create location
  async create(
    locationId: GetLocationsParamDto,
    locationDto: CreateLocationDto,
  ): Promise<CreateLocationDto> {
    // Create location object
    const newLocation: Location = this.location.create({
      ...locationDto,
      organizationId: locationId.organizationId,
      createdAt: now(),
      updatedAt: now(),
    });
    // Saves into the database
    return await this.location.save(newLocation);
  }

  async update(
    locationParam: LocationParamDto,
    locationDto: UpdateLocationDto,
  ): Promise<UpdateLocationDto> {
    // Create location object
    const updateLocation: Location | null = await this.location.findOne({
      where: {
        id: locationParam.locationId, // Find by id
        organizationId: locationParam.organizationId, // Fnd by locationId
      },
    });

    if (!updateLocation) {
      throw new NotFoundException(
        `Location with ID ${locationParam.locationId} under organization ${locationParam.organizationId} was not found.`,
      );
    }

    // Merge the updates
    Object.assign(updateLocation, locationDto);

    // Saves into the database
    return this.location.save(updateLocation);
  }

  async delete(locationParam: LocationParamDto): Promise<DeleteLocationDto> {
    // Find the locationa using the id and organization fields
    const location: Location | null = await this.location.findOne({
      where: {
        id: locationParam.locationId,
        organizationId: locationParam.organizationId,
      },
    });

    if (!location) {
      throw new NotFoundException(
        `Location with ID ${locationParam.locationId} under organization ${locationParam.organizationId} was not found.`,
      );
    }

    // Delete
    await this.location.remove(location);

    return location;
  }
}
