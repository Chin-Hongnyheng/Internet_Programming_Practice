import { UserRole } from "./user_roles.entity";
import { RefreshToken } from "./refresh_tokens.entity";
export declare class User {
    id: number;
    email: string;
    passwordHash: string;
    isActive: boolean;
    roles: UserRole[];
    refreshTokens: RefreshToken[];
    createdAt: Date;
}
