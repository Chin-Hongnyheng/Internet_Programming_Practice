import { Module } from '@nestjs/common';
import { OrdersModule } from './orders/orders.module';
import { ReceiptsModule } from './receipts/receipts.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentsModule } from './payment/payments.module';
import { NotificationsModule } from './notifications/notifications.module';
import { CoreModule } from './core/core.module';

@Module({
  imports: [OrdersModule, ReceiptsModule,PaymentsModule,NotificationsModule,
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
    CoreModule
  ],
  controllers:[AppController],
  providers: [AppService]
})
export class AppModule {}
