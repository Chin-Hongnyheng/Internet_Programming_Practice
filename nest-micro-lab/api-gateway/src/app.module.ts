import { Module } from '@nestjs/common';
import { OrdersModule } from './orders/orders.module';
import { ReceiptsModule } from './receipts/receipts.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentsModule } from './payment/payments.module';
import { NotificationModule } from './notifications/notification.module';
import { CoreModule } from './core/core.module';

@Module({
  imports: [OrdersModule, ReceiptsModule,PaymentsModule,NotificationModule,
    TypeOrmModule.forRoot({
      type:'postgres',
      host:'postgres',
      port:5432,
      username:'postgres',
      password:'postgres',
      database:'order-worker',
      entities:[__dirname + '/**/*.entity{.ts,.js'],
      autoLoadEntities: true,
      synchronize:true,
    }),
    CoreModule,
    NotificationModule.forRoot({
      appName: 'API Gateway Lab',
      defaultChannel: 'log',
      enable: true,
    }),
  ],
  controllers:[AppController],
  providers: [AppService]
})
export class AppModule {}
