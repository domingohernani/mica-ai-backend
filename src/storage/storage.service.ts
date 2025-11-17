import { Bucket, File, Storage } from '@google-cloud/storage';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StorageService {
  private client: Storage;
  private bucket: string;

  constructor() {
    this.client = new Storage();
    this.bucket = 'recorded-temp';
  }

  async upload(bufferFile: Buffer, fileName: string): Promise<void> {
    const currentBucket: Bucket = this.client.bucket(this.bucket);
    const file: File = currentBucket.file(fileName);
    await file.save(bufferFile);
    console.log('File uploaded');
  }
}
