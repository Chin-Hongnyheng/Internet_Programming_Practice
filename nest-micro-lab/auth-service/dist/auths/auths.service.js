"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = __importStar(require("bcryptjs"));
const crypto_1 = require("crypto");
const users_entity_1 = require("../entities/users.entity");
const user_roles_entity_1 = require("../entities/user_roles.entity");
const role_permissions_entity_1 = require("../entities/role_permissions.entity");
const refresh_tokens_entity_1 = require("../entities/refresh_tokens.entity");
const roles_entity_1 = require("../entities/roles.entity");
let AuthsService = class AuthsService {
    jwt;
    users;
    roles;
    userRoles;
    rolePerms;
    refreshTokens;
    constructor(jwt, users, roles, userRoles, rolePerms, refreshTokens) {
        this.jwt = jwt;
        this.users = users;
        this.roles = roles;
        this.userRoles = userRoles;
        this.rolePerms = rolePerms;
        this.refreshTokens = refreshTokens;
    }
    async register(email, password) {
        const passwordHash = await bcrypt.hash(password, 10);
        const existing = await this.users.findOne({ where: { email } });
        if (existing) {
            throw new common_1.UnauthorizedException('Email already registered');
        }
        const user = this.users.create({
            email,
            passwordHash,
        });
        await this.users.save(user);
        const role = await this.roles.findOne({
            where: { name: 'user' },
        });
        if (!role) {
            throw new Error('Default role "user" not found');
        }
        const userRole = this.userRoles.create({
            user: { id: user.id },
            role: { id: role.id },
        });
        await this.userRoles.save(userRole);
        return { message: 'registered' };
    }
    async login(email, password) {
        const user = await this.users.findOne({ where: { email } });
        if (!user)
            throw new common_1.UnauthorizedException('Invalid credentials');
        const ok = await bcrypt.compare(password, user.passwordHash);
        if (!ok)
            throw new common_1.UnauthorizedException('Invalid credentials');
        const roles = await this.userRoles.find({
            where: { user: { id: user.id } },
            relations: { role: true, user: true },
        });
        const roleNames = roles.map((r) => r.role.name);
        const roleIds = roles.map((r) => r.role.id);
        const perms = await this.rolePerms
            .createQueryBuilder('rp')
            .leftJoinAndSelect('rp.permission', 'permission')
            .where('rp.roleId IN (:...roleIds)', { roleIds })
            .getMany();
        const permissionKeys = [...new Set(perms.map((x) => x.permission.key))];
        const accessToken = await this.jwt.signAsync({
            sub: user.id,
            email: user.email,
            roles: roleNames,
            permissions: permissionKeys,
        }, {
            secret: process.env.JWT_ACCESS_SECRET,
            expiresIn: process.env.JWT_ACCESS_EXPIRES ?? '15m',
        });
        const refreshToken = (0, crypto_1.randomBytes)(48).toString('hex');
        const refreshTokenHash = await bcrypt.hash(refreshToken, 10);
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7);
        await this.refreshTokens.save(this.refreshTokens.create({
            user: { id: user.id },
            tokenHash: refreshTokenHash,
            expiresAt,
        }));
        return { accessToken, refreshToken };
    }
};
exports.AuthsService = AuthsService;
exports.AuthsService = AuthsService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(users_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(roles_entity_1.Role)),
    __param(3, (0, typeorm_1.InjectRepository)(user_roles_entity_1.UserRole)),
    __param(4, (0, typeorm_1.InjectRepository)(role_permissions_entity_1.RolePermission)),
    __param(5, (0, typeorm_1.InjectRepository)(refresh_tokens_entity_1.RefreshToken)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], AuthsService);
//# sourceMappingURL=auths.service.js.map