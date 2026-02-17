import { Inject, Injectable } from '@nestjs/common';
import {
  NOTIFICATION_FEATURE_OPTIONS,
  NOTIFICATION_FEATURE_REGISTRY,
} from './constants';
import * as interfaces from './interfaces';

@Injectable()
export class NotificationFeatureRegistrar {
  constructor(
    @Inject(NOTIFICATION_FEATURE_REGISTRY)
    private readonly registry: interfaces.NotificationFeatureOptions[],

    @Inject(NOTIFICATION_FEATURE_OPTIONS)
    private readonly feature: interfaces.NotificationFeatureOptions,
  ) {
    // runs when the module loads
    this.registry.push(this.feature);
  }
}