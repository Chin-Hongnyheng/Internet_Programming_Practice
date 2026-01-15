import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { randomBytes } from "crypto";

import { User } from "../entities/users.entity";
import { UserRole } from "../entities/user_roles.entity";
import { RolePermission } from "../entities/role_permissions.entity";
import { RefreshToken } from "../entities/refresh_tokens.entity";
import { Role } from "src/entities/roles.entity";

@Injectable()
export class AuthsService {
  constructor(
    private readonly jwt: JwtService,

    @InjectRepository(User)
    private readonly users: Repository<User>,

    @InjectRepository(Role) private readonly roles: Repository<Role>,

    @InjectRepository(UserRole)
    private readonly userRoles: Repository<UserRole>,

    @InjectRepository(RolePermission)
    private readonly rolePerms: Repository<RolePermission>,

    @InjectRepository(RefreshToken)
    private readonly refreshTokens: Repository<RefreshToken>,
  ) {}

  async register(email: string, password: string) {
    const passwordHash = await bcrypt.hash(password, 10);

    // TODO: check if email exists
    const existing = await this.users.findOne({ where: { email } });
    if (existing) {
      throw new UnauthorizedException("Email already registered");
    }
    // TODO: create user
    const user = this.users.create({
      email,
      passwordHash,
    });
    await this.users.save(user);

    // TODO: attach default role "user" in user_roles
    const userRole = this.userRoles.create({
      user: { id: user.id },
      role: { name: "user" }, // assumes Role entity exists
    });
    await this.userRoles.save(userRole);

    return { message: "registered" };
  }

  async login(email: string, password: string) {
    const user = await this.users.findOne({ where: { email } });
    if (!user) throw new UnauthorizedException("Invalid credentials");

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) throw new UnauthorizedException("Invalid credentials");

    // Fetch roles
    const roles = await this.userRoles.find({
      where: { user: { id: user.id } },
      relations: { role: true, user: true },
    });
    const roleNames = roles.map((r) => r.role.name);

    // Fetch permissions via roles
    const roleIds = roles.map((r) => r.role.id);
    const perms = await this.rolePerms
      .createQueryBuilder("rp")
      .leftJoinAndSelect("rp.permission", "permission")
      .where("rp.roleId IN (:...roleIds)", { roleIds })
      .getMany();

    const permissionKeys = [...new Set(perms.map((x) => x.permission.key))];

    const accessToken = await this.jwt.signAsync(
      { sub: user.id, email: user.email, roles: roleNames, permissions: permissionKeys },
      { secret: process.env.JWT_ACCESS_SECRET, expiresIn:(process.env.JWT_ACCESS_EXPIRES as any) ?? "15m" },
    );

    const refreshToken = randomBytes(48).toString("hex");
    const refreshTokenHash = await bcrypt.hash(refreshToken, 10);

    // TODO: store refresh token hash
    // expiresAt should be computed (ex: now + 7 days)

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await this.refreshTokens.save(
      this.refreshTokens.create({
        user: { id: user.id },
        tokenHash: refreshTokenHash,
        expiresAt,
      }),
    );

    return { accessToken, refreshToken };
  }
}