import {Module} from '@nestjs/common';
import {TaskService} from './task.service';
import {TaskController} from './task.controller';
import { NotificationModule } from 'src/notifications/notification.module';

@Module({
    // imports: [NotificationModule.register({type: 'log'})],
    controllers: [TaskController],
    providers: [TaskService],
})
export class TaskModule{}
