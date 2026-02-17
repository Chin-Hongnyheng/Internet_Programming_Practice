import { BadRequestException, PipeTransform } from '@nestjs/common';

export class PhoneNormalizePipe implements PipeTransform {
  transform(value: any) {
    if (typeof value !== 'string') {
      throw new BadRequestException('phone must be a string');
    }

    let normalized = value.replace(/[\s\-()]/g, '');

    if (normalized.startsWith('0')) {
      normalized = '+855' + normalized.slice(1);
    }

    if (!normalized.startsWith('+855')) {
      throw new BadRequestException('phone must start with +855 or 0');
    }

    const rest = normalized.slice(4);
    if (!/^\d{8,9}$/.test(rest)) {
      throw new BadRequestException('phone must be valid digits after +855');
    }

    return normalized;
  }
}
