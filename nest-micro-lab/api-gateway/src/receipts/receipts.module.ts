import { Module } from '@nestjs/common';
import { ReceiptsController } from './receipts.controller';
import { ReceiptsService } from './receipts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Receipt } from 'src/database/entities/receipts.entity';
import { NotificationModule } from 'src/notifications/notification.module';


@Module({
  imports: [TypeOrmModule.forFeature([Receipt]),
  NotificationModule.forFeature({
      featureName: 'receipts',
      prefix: '[RECEIPTS]',
      channels: ['log'], // only log for receipts
      enable: false,
    }),
],
  providers: [ReceiptsService],
  controllers: [ReceiptsController],
  // exports:[ReceiptsService],
})
export class ReceiptsModule {}
