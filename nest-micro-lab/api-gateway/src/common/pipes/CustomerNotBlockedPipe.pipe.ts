import { PipeTransform, Injectable, ForbiddenException } from '@nestjs/common';
import { CustomerService } from 'src/customer/customers.service';
import { CreateCustomerDto } from 'src/customer/dto/create-customer.dto';

@Injectable()
export class CustomerNotBlockedPipe implements PipeTransform {
  constructor(private readonly customerService: CustomerService) {}

  transform(value: CreateCustomerDto) {
    value.fullName = value.fullName?.trim();

    if (value.fullName && this.customerService.isBlockedName(value.fullName)) {
      throw new ForbiddenException('This customer name is blocked');
    }

    if (value.phone && this.customerService.isBlockedPhone(value.phone)) {
      throw new ForbiddenException('This phone number is blocked');
    }

    if (value.nationalId && this.customerService.isBlockedNationalId(value.nationalId)) {
      throw new ForbiddenException('This national ID is blocked');
    }

    return value;
  }
}
