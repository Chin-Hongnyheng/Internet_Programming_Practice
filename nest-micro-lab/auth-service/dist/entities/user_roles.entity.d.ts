import { User } from './users.entity';
import { Role } from './roles.entity';
export declare class UserRole {
    id: number;
    user: User;
    role: Role;
}
