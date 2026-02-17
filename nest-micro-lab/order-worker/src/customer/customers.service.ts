import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class CustomerService{
    private blockedPhones = ['+85512345678', '+85598765432'];
    private blockedNationalIds = ['111111111', '222222222'];
    private blockedNames = ['Rith', 'Davin'];
    

    isBlockedPhone(phone: string): boolean {
        return this.blockedPhones.includes(phone);
    }

    isBlockedNationalId(nationalId?: string): boolean {
        if (!nationalId) return false;
            return this.blockedNationalIds.includes(nationalId);
    }

    isBlockedName(name: string): boolean {
        return this.blockedNames.includes(name);
    }


}