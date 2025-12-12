import { Module } from '@nestjs/common';
import { OrdersModule } from './orders/orders.module';
import { ReceiptsModule } from './receipts/receipts.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [OrdersModule, ReceiptsModule,
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
    })
  ],
  controllers:[AppController],
  providers: [AppService]
})
export class AppModule {}
