import {Injectable} from '@nestjs/common';
import { NotificationsService } from 'src/notifications/notifications.service';

@Injectable()
export class TaskService{
    constructor(private readonly notifier: NotificationsService){}

    create(task:any){
        this.notifier.notify('task', 'task_created', { task })
    }
}