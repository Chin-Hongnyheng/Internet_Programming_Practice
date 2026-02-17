// import { DynamicModule, forwardRef, Module } from '@nestjs/common';
// import { NotificationsService } from './notification.service';
// import { OrdersModule } from 'src/orders/orders.module';
// import { CoreModule } from 'src/core/core.module';

// @Module({
//   // imports: [forwardRef(() => OrdersModule)],
//   imports: [CoreModule],
//   exports: [NotificationsService],
//   providers: [NotificationsService]
// })
// export class NotificationsModule {
//   static register(options: NotificationsModule): DynamicModule{
//     return{
//       module:NotificationsModule,
//       providers:[
//         {
//           provide:'NOTIFICATION_OPTIONS',
//           useValue: options,
//         },
//         NotificationsService,
//       ],
//       exports: [NotificationsService],
//     }
//   }
// }

// //inject from notificationService -> receiptService
// // - import NotificationModule to receiptModule
// // - import NotificationService to receiptService
// // - import NotificationModule to receiptModule
// // - export NotificationService in NotificationModule

import { DynamicModule, Module } from '@nestjs/common';
import {
  NOTIFICATION_FEATURE_OPTIONS,
  NOTIFICATION_OPTIONS,
} from './constants';
import {
  NotificationModuleOptions,
  NotificationFeatureOptions,
} from './interfaces';
import { NotificationsService } from './notifications.service';
import { NotificationFeatureRegistrar } from './notifications-feature.registrar';
import { NotificationsRegistryModule } from './notifications-registry.module';

@Module({
  imports: [NotificationsRegistryModule], // ✅ registry always available
})
export class NotificationModule {
  static
    // // - import NotificationService to receiptService
    // // - import NotificationModule to receiptModule
    // // - export NotificationService in NotificationModule
    register(arg0: { type: string; }): import("@nestjs/common").Type<any> | DynamicModule | Promise<DynamicModule> | import("@nestjs/common").ForwardReference<any> {
      throw new Error('Method not implemented.');
  }
  static forRoot(options: NotificationModuleOptions): DynamicModule {
    return {
      module: NotificationModule,
      global: true, // optional
      providers: [
        { provide: NOTIFICATION_OPTIONS, useValue: options },
        NotificationsService,
      ],
      exports: [NotificationsService],
    };
  }

  static forFeature(feature: NotificationFeatureOptions): DynamicModule {
    return {
      module: NotificationModule,
      providers: [
        { provide: NOTIFICATION_FEATURE_OPTIONS, useValue: feature },
        NotificationFeatureRegistrar,
      ],
    };
  }
}