import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Notify } from 'src/notifications/notify.decorator';
import { NotifyInterceptor } from 'src/notifications/notify.interceptor';

@Controller('orders')
@UseInterceptors(NotifyInterceptor) // apply interceptor for this controller
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @Notify('orders', 'order_created') // this triggers notification automatically
  create(@Body() body: any) {
    return this.ordersService.createOrder(body);
  }
}

  // @Delete()
  // delete() {
  //   console.log('controller delete');
  //   return this.ordersService.deleteOrder();
  // }