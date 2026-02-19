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
import { LocationService } from './location.service';
import {
  type CreateLocationDto,
  createLocationSchema,
} from './schemas/create-location.schema';
import { DeleteLocationDto } from './schemas/delete-location.schema';
import { GetAllLocationsDto } from './schemas/get-all-locations.schema';
import {
  type GetLocationsParamDto,
  getLocationsParamSchema,
} from './schemas/get-locations-params.schema';
import {
  type LocationParamDto,
  locationParamSchema,
} from './schemas/location-param.schema';
import {
  type UpdateLocationDto,
  updateLocationSchema,
} from './schemas/update-location.schema';

@Controller('organizations/:organizationId')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Public()
  @Get('locations')
  @UsePipes(new ZodValidationPipe(getLocationsParamSchema))
  async findAll(
    @Param() organizationDto: GetLocationsParamDto,
  ): Promise<GetAllLocationsDto> {
    return await this.locationService.findAll(organizationDto);
  }

  @Public()
  @Post('locations')
  async create(
    @Param(new ZodValidationPipe(getLocationsParamSchema))
    organizationDto: GetLocationsParamDto,
    @Body(new ZodValidationPipe(createLocationSchema))
    locationDto: CreateLocationDto,
  ): Promise<CreateLocationDto> {
    return await this.locationService.create(organizationDto, locationDto);
  }

  @Public()
  @Patch('locations/:locationId')
  async update(
    @Param(new ZodValidationPipe(locationParamSchema))
    params: LocationParamDto,
    @Body(new ZodValidationPipe(updateLocationSchema))
    locationDto: UpdateLocationDto,
  ): Promise<UpdateLocationDto> {
    return await this.locationService.update(params, locationDto);
  }

  @Public()
  @Delete('locations/:locationId')
  async delete(
    @Param(new ZodValidationPipe(locationParamSchema))
    locationParam: LocationParamDto,
  ): Promise<DeleteLocationDto> {
    return await this.locationService.delete(locationParam);
  }
}
