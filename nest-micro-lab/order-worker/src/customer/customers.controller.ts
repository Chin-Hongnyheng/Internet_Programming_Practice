import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { CustomerService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CustomerDobPipe } from '../common/pipes/dob-validation.pipe';
import { PhoneNormalizePipe } from 'src/common/pipes/phonenormalize-validation.pipe';
import { TrimPipe } from 'src/common/pipes/trim.pipe';
import { CustomerNotBlockedPipe } from 'src/common/pipes/CustomerNotBlockedPipe.pipe';
import { VerifyCustomerPipe } from 'src/common/pipes/customer-verification.pipe';

@Controller('customers')
export class CustomerController {
  constructor(private readonly service: CustomerService) {}

  @Post('verify')
  verifyCustomer(
    @Body(VerifyCustomerPipe) body:CreateCustomerDto
  ) {
    return {
      ok: true,
      normalized: {
        body
      },
    };
  }

//   @Post('verify')
//   verifyCustomer(
//     @Body('fullName', new TrimPipe(), new CustomerNotBlockedPipe('fullName')) fullName: string,
//     @Body('dob', new CustomerDobPipe()) dob: string,
//     @Body('phone', new PhoneNormalizePipe(), new CustomerNotBlockedPipe('phone')) phone: string,
//     @Body('nationalId', new CustomerNotBlockedPipe('nationalId')) nationalId?: string
//   ) {
//     return {
//       ok: true,
//       normalized: {
//         fullName,
//         dob,
//         phone,
//         nationalId,
//       },
//     };
//   }
}
