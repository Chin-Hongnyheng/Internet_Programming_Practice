import { Role } from './roles.entity';
import { Permission } from './permissions.entity';
export declare class RolePermission {
    id: number;
    role: Role;
    permission: Permission;
}
