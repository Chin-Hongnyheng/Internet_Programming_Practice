"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthsModule = void 0;
const common_1 = require("@nestjs/common");
const auths_controller_1 = require("./auths.controller");
const auths_service_1 = require("./auths.service");
const typeorm_1 = require("@nestjs/typeorm");
const users_entity_1 = require("../entities/users.entity");
const user_roles_entity_1 = require("../entities/user_roles.entity");
const role_permissions_entity_1 = require("../entities/role_permissions.entity");
const refresh_tokens_entity_1 = require("../entities/refresh_tokens.entity");
const roles_entity_1 = require("../entities/roles.entity");
const permissions_entity_1 = require("../entities/permissions.entity");
const jwt_1 = require("@nestjs/jwt");
const jwt_strategy_1 = require("./strategies/jwt.strategy");
const roles_guard_1 = require("./guards/roles.guard");
const permissions_guard_1 = require("./guards/permissions.guard");
const demo_controller_1 = require("./demo.controller");
let AuthsModule = class AuthsModule {
};
exports.AuthsModule = AuthsModule;
exports.AuthsModule = AuthsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([users_entity_1.User, roles_entity_1.Role, permissions_entity_1.Permission, user_roles_entity_1.UserRole, role_permissions_entity_1.RolePermission, refresh_tokens_entity_1.RefreshToken]),
            jwt_1.JwtModule.register({}),
        ],
        controllers: [auths_controller_1.AuthsController, demo_controller_1.DemoController],
        providers: [auths_service_1.AuthsService, jwt_strategy_1.JwtStrategy, roles_guard_1.RolesGuard, permissions_guard_1.PermissionsGuard],
        exports: [auths_service_1.AuthsService]
    })
], AuthsModule);
//# sourceMappingURL=auths.module.js.map