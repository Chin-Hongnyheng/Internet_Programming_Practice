import { BadRequestException, PipeTransform } from '@nestjs/common';

export class CustomerDobPipe implements PipeTransform {
  transform(value: any) {
    // 1. Check if value is a string
    if (typeof value !== 'string') {
      throw new BadRequestException('dob must be a string');
    }

    // 2. Check if the string has format "dd/mm/yyyy" => 23/02/2005
    const match = value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
    if (!match) {
      throw new BadRequestException('dob must have format dd/mm/yyyy');
    }
    const year = Number(match[3]);
    const month = Number(match[2]);
    const day = Number(match[1]);

    // 3. Check if the date is < 2010
    if (year && year >= 2010) {
      throw new BadRequestException('dob year must be less than 2010');
    }

    const date = new Date(year, month - 1, day)
    if(date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day){
      throw new BadRequestException("Dob must be valid from calendar date")
    }
    return value;
  }
}
