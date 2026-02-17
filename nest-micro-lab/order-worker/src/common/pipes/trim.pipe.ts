import { BadRequestException, PipeTransform } from '@nestjs/common';

export class TrimPipe implements PipeTransform {
  transform(value: any) {
    // 1. Check if value is a string
    if (typeof value !== 'string') {
      throw new BadRequestException('Value must be a string');
    }

    // 2️. Trim spaces
    const trimmed = value.trim();

    // 3️. Optional: reject if empty
    if (!trimmed) {
      throw new BadRequestException('Value cannot be empty');
    }
    
    return trimmed;
  }
}
