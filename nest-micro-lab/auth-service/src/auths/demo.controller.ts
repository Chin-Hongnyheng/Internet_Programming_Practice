import { Controller, Get, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auths/guards/jwt-auth.guard";
import { Roles } from "../auths/decorators/roles.decorator";
import { Permissions } from "../auths/decorators/permissions.decorator";
import { RolesGuard } from "../auths/guards/roles.guard";
import { PermissionsGuard } from "../auths/guards/permissions.guard";

@Controller()
export class DemoController {
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
  @Get("admin/ping")
  pingAdmin() {
    return { ok: true, scope: "admin" };
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions("order.read")
  @Get("orders/ping")
  pingOrders() {
    return { ok: true, scope: "order.read" };
  }
}