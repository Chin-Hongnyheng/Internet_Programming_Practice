import { PipeTransform, Injectable, BadRequestException, ForbiddenException } from '@nestjs/common';
import { CustomerService } from 'src/customer/customers.service';
import { TrimPipe } from 'src/common/pipes/trim.pipe';
import { CustomerDobPipe } from 'src/common/pipes/dob-validation.pipe';
import { PhoneNormalizePipe } from 'src/common/pipes/phonenormalize-validation.pipe';
import { CreateCustomerDto } from 'src/customer/dto/create-customer.dto';

@Injectable()
export class VerifyCustomerPipe implements PipeTransform {
  constructor(private readonly customerService: CustomerService) {}

  transform(value: CreateCustomerDto) {
    if (!value) {
      throw new BadRequestException('Body is required');
    }

    // 1. Trim fullName
    const trimPipe = new TrimPipe();
    value.fullName = trimPipe.transform(value.fullName);

    if (!value.fullName) {
      throw new BadRequestException('fullName cannot be empty');
    }

    // 2️. Validate DOB
    const dobPipe = new CustomerDobPipe();
    value.dob = dobPipe.transform(value.dob);

    // 3️. Normalize phone
    const phonePipe = new PhoneNormalizePipe();
    value.phone = phonePipe.transform(value.phone);

    // 4️. Block checks
    if (this.customerService.isBlockedName(value.fullName)) {
      throw new ForbiddenException('This customer name is blocked');
    }

    if (this.customerService.isBlockedPhone(value.phone)) {
      throw new ForbiddenException('This phone number is blocked');
    }

    if (value.nationalId && this.customerService.isBlockedNationalId(value.nationalId)) {
      throw new ForbiddenException('This national ID is blocked');
    }

    return value;
  }
}
