import { Controller } from '@nestjs/common';
import { Injectable, Logger } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';

@Controller('orders')
export class OrdersController {
    @EventPattern('order_created')
      handleOrderCreated(@Payload() data: any, @Ctx() context: RmqContext) {
        console.log(`Incoming message`);
      }
    @EventPattern('order_deleted')
  handleOrderDeleted(@Payload() data: any, @Ctx() context: RmqContext) {
    console.log(`Received Message`);

  }
}
