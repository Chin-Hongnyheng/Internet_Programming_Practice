import { Module } from '@nestjs/common';
import { OrdersModule } from './orders/orders.module';
import { ReceiptsModule } from './receipts/receipts.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentsModule } from './payment/payments.module';
import { NotificationModule } from './notifications/notification.module';
import { CoreModule } from './core/core.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { Category } from './category/entities/category.entity';
import { Receipt } from './receipts/entities/receipts.entity';
import { Product } from './product/entities/product.entity';
import { CustomerModule } from './customer/customers.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AppGraphqlModule } from './graphql/graphql.module';
import { graphql } from 'graphql';



@Module({
  imports: [OrdersModule, ReceiptsModule,PaymentsModule,NotificationModule, DatabaseModule,
    CoreModule,
    ConfigModule.forRoot({ isGlobal: true }),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/graphql/schema.gql'),
      // typePaths: [join(process.cwd(), 'src/graphql/schema/*.graphql')],
      playground: true,
      // sortSchema: true,
    }),
    AppGraphqlModule,
    DatabaseModule.forRoot({
      // TODO: read from process.env
      host: process.env.DB_HOST!,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER!,
      password: process.env.DB_PASS!,
      database: process.env.DB_NAME!,
      entities:[Category,Product,Receipt],
    }),
    CategoryModule,
    ProductModule,
    CustomerModule,
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
