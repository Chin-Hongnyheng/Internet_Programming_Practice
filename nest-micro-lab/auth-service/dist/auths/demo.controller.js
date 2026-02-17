"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DemoController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auths/guards/jwt-auth.guard");
const roles_decorator_1 = require("../auths/decorators/roles.decorator");
const permissions_decorator_1 = require("../auths/decorators/permissions.decorator");
const roles_guard_1 = require("../auths/guards/roles.guard");
const permissions_guard_1 = require("../auths/guards/permissions.guard");
let DemoController = class DemoController {
    pingAdmin() {
        return { ok: true, scope: "admin" };
    }
    pingOrders() {
        return { ok: true, scope: "order.read" };
    }
};
exports.DemoController = DemoController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)("admin"),
    (0, common_1.Get)("admin/ping"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DemoController.prototype, "pingAdmin", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, permissions_decorator_1.Permissions)("order.read"),
    (0, common_1.Get)("orders/ping"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DemoController.prototype, "pingOrders", null);
exports.DemoController = DemoController = __decorate([
    (0, common_1.Controller)()
], DemoController);
//# sourceMappingURL=demo.controller.js.map