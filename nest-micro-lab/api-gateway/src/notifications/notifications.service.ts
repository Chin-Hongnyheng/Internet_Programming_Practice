// import { forwardRef,Inject, Injectable } from '@nestjs/common';
// import {OrdersService} from 'src/orders/orders.service'
// import { EVENT_PUBLISHER } from 'src/core/tokens';

// type EventPublisher = { publish: (event: string, payload: any) => void}

// @Injectable()
// export class NotificationsService {
//     constructor(
//         @Inject(EVENT_PUBLISHER)
//         private readonly publisher: EventPublisher,
//         // @Inject(forwardRef(()=>OrdersService))
//         // private readonly ordersService: OrdersService
//     ){}

//     notify(event: string, payload: any){
//         // console.log(`[NOTIFY] ${event}`, payload);
//         this.publisher.publish(event,payload);

//         return{ok:true};
//     }
// }
import { Inject, Injectable } from '@nestjs/common';
import {
  NOTIFICATION_FEATURE_REGISTRY,
  NOTIFICATION_OPTIONS,
} from './constants';
import * as interfaces from './interfaces';

@Injectable()
export class NotificationsService {
  constructor(
    @Inject(NOTIFICATION_OPTIONS)
    private readonly options: interfaces.NotificationModuleOptions,

    @Inject(NOTIFICATION_FEATURE_REGISTRY)
    private readonly features: interfaces.NotificationFeatureOptions[],
  ) {}

  // Get feature config by name
  private getFeature(featureName: string): interfaces.NotificationFeatureOptions | undefined {
    return this.features.find(f => f.featureName === featureName);
  }

  // Resolve channels (feature override -> global default)
  private resolveChannels(feature?: interfaces.NotificationFeatureOptions): interfaces.NotificationChannel[] {
    if (!this.options.enable) return [];
    if (feature?.channels?.length) return feature.channels;
    return [this.options.defaultChannel];
  }

  notify(featureName: string, event: string, payload: any) {
    if (!this.options.enable) return { skipped: true, reason: 'notifications disabled' };

    const feature = this.getFeature(featureName);
    const channels = this.resolveChannels(feature);

    const prefix = feature?.prefix ?? `[${featureName.toUpperCase()}]`;
    const message = `${prefix} (${this.options.appName}) ${event}`;

    // For lab: only log, pretend “channels”
    for (const ch of channels) {
      console.log(`[${ch.toUpperCase()}] ${message}`, payload);
    }

    return { ok: true, channels, featureName, event };
  }
}
