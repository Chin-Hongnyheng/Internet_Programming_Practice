import { Module } from '@nestjs/common';
import { AuthsController } from './auths.controller';
import { AuthsService } from './auths.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/users.entity';
import { UserRole } from '../entities/user_roles.entity';
import { RolePermission } from '../entities/role_permissions.entity';
import { RefreshToken } from '../entities/refresh_tokens.entity';
import { Role } from '../entities/roles.entity';
import { Permission } from 'src/entities/permissions.entity';
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from './strategies/jwt.strategy';
import { RolesGuard } from './guards/roles.guard';
import { PermissionsGuard } from './guards/permissions.guard';
import { DemoController } from './demo.controller';


@Module({
  imports:[
    TypeOrmModule.forFeature([User, Role, Permission, UserRole, RolePermission, RefreshToken]),
    JwtModule.register({}),
  ],
  controllers: [AuthsController, DemoController],
  providers: [AuthsService, JwtStrategy, RolesGuard, PermissionsGuard],
  exports: [AuthsService]
})
export class AuthsModule {}