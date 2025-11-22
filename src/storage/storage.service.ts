import type {
  GetSignedUrlConfig,
  GetSignedUrlResponse,
} from '@google-cloud/storage';
import { Bucket, File, Storage } from '@google-cloud/storage';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StorageService {
  private client: Storage;
  private bucket: string;

  // Initialize cliend and bucket name;
  constructor() {
    this.client = new Storage();
    this.bucket = 'recorded-temp';
  }
  // Update file on cloud
  async upload(bufferFile: Buffer, filePath: string): Promise<void> {
    const currentBucket: Bucket = this.client.bucket(this.bucket);
    const file: File = currentBucket.file(filePath);
    await file.save(bufferFile);
  }

  // Generate signed url
  // eg: folder/file.mp3
  async sign(filePath: string): Promise<string> {
    // These options will allow temporary read access to the file
    const options: GetSignedUrlConfig = {
      version: 'v4',
      action: 'read',
      expires: Date.now() + 15 * 60 * 1000, // 15 minutes
    };

    // Get a v4 signed URL for reading the file
    const signedUrl: Promise<GetSignedUrlResponse> = this.client
      .bucket(this.bucket)
      .file(filePath)
      .getSignedUrl(options);

    return (await signedUrl).toString();
  }
}
