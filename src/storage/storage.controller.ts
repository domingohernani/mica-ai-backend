import { Body, Controller, Post } from '@nestjs/common';

import { StorageService } from './storage.service';

@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Post()
  async create(@Body() buffer: Buffer): Promise<void> {
    await this.storageService.upload(buffer, 'testing.mp3');
  }
}
