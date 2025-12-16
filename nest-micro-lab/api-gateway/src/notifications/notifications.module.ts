import { forwardRef, Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { OrdersModule } from 'src/orders/orders.module';
import { CoreModule } from 'src/core/core.module';

@Module({
  // imports: [forwardRef(() => OrdersModule)],
  imports: [CoreModule],
  exports: [NotificationsService],
  providers: [NotificationsService]
})
export class NotificationsModule {}

//inject from notificationService -> receiptService
// - import NotificationModule to receiptModule
// - import NotificationService to receiptService
// - import NotificationModule to receiptModule
// - export NotificationService in NotificationModule