import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

export class ValidateMongoId implements PipeTransform<string, string> {
  transform(value: string, metadata: ArgumentMetadata): string {
    if (!isValidObjectId(value))
      throw new BadRequestException(metadata.data + ' không hợp lệ!');

    return value;
  }
}
