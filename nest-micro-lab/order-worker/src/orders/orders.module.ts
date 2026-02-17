import { Module, forwardRef } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { PaymentsModule } from 'src/payment/payments.module';
import { PaymentsService } from 'src/payment/payments.service';
import { NotificationModule } from 'src/notifications/notification.module';
import { CustomerModule } from 'src/customer/customers.module';
import { JwtStrategy } from 'src/strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
@Module({
  imports: [
    forwardRef(() => PaymentsModule),
    forwardRef(() => NotificationModule),
    CustomerModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    ClientsModule.register([
      {
        name: 'ORDERS_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://rabbitmq:5672'],
          queue: 'orders_queue',
          queueOptions: { durable: false },
        },
      },
    ]),
    NotificationModule.forFeature({
      featureName: 'orders',
      prefix: '[ORDERS]',
      channels: ['log', 'telegram'],
      enable: true, // override global default
    }),
    
  ],
  controllers: [OrdersController],
  providers: [OrdersService,JwtStrategy],
  exports: [OrdersService]
})
export class OrdersModule {}