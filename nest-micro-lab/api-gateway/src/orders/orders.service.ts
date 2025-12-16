import { Inject,forwardRef, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PaymentsService } from 'src/payment/payments.service';
import { NotificationsService } from 'src/notifications/notifications.service';

@Injectable()
export class OrdersService {
  constructor(
    @Inject('ORDERS_SERVICE') private readonly client: ClientProxy,
    private readonly paymentService: PaymentsService,
    // @Inject(forwardRef(()=>NotificationsService))
    private readonly notifications: NotificationsService
  ) {}

  async createOrder(orderDto: any) {
    // In real life we might validate or save to DB first
    // Here we just emit an event
    this.client.emit('order_created', { order: orderDto, createdAt: new Date().toISOString() });

    this.notifications.notify('order_created', {
      order: orderDto,
    });

    return { status: 'Order accepted', order: orderDto };
  }
  deleteOrder() {
    this.client.emit('order_deleted', {});
    return { status: 'Order deletion requested' };
  }
}