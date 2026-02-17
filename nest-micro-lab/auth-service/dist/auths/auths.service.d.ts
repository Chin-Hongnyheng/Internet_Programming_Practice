import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from '../entities/users.entity';
import { UserRole } from '../entities/user_roles.entity';
import { RolePermission } from '../entities/role_permissions.entity';
import { RefreshToken } from '../entities/refresh_tokens.entity';
import { Role } from 'src/entities/roles.entity';
export declare class AuthsService {
    private readonly jwt;
    private readonly users;
    private readonly roles;
    private readonly userRoles;
    private readonly rolePerms;
    private readonly refreshTokens;
    constructor(jwt: JwtService, users: Repository<User>, roles: Repository<Role>, userRoles: Repository<UserRole>, rolePerms: Repository<RolePermission>, refreshTokens: Repository<RefreshToken>);
    register(email: string, password: string): Promise<{
        message: string;
    }>;
    login(email: string, password: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
}
