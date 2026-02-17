import { Body, Controller, Post, UseInterceptors, BadRequestException } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Notify } from 'src/notifications/notify.decorator';
import { NotifyInterceptor } from 'src/notifications/notify.interceptor';
import { CustomerService } from 'src/customer/customers.service';
import { VerifyCustomerPipe } from 'src/common/pipes/customer-verification.pipe';
import { CreateCustomerDto } from 'src/customer/dto/create-customer.dto';

@Controller('orders')
@UseInterceptors(NotifyInterceptor)
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly customerService: CustomerService, // inject customer service
  ) {}

  @Post()
  @Notify('orders', 'order_created')
  async create(@Body() body: any) {
    // 1️⃣ Check order body fields
    const { orderId, item, quantity, customer } = body;
    if (!orderId || !item || !quantity) {
      throw new BadRequestException('orderId, item, and quantity are required');
    }

    // 2️⃣ Run customer verification
    if (!customer) {
      throw new BadRequestException('Customer info is required');
    }

    const verifiedCustomer = new VerifyCustomerPipe(this.customerService).transform(customer);

    // 3️⃣ Create order with verified customer
    const orderDto = {
      orderId,
      item,
      quantity,
      customer: verifiedCustomer,
    };

    return this.ordersService.createOrder(orderDto);
  }
}
