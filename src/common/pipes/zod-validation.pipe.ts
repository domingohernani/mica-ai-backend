import { BadRequestException, PipeTransform } from '@nestjs/common';
import { prettifyError, ZodSchema } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: any) {
    const result = this.schema.safeParse(value);

    if (!result.success) {
      throw new BadRequestException('Validation failed', {
        cause: new Error(),
        description: prettifyError(result.error),
      });
    }
    return result.data;
  }
}
