import { Entity, PrimaryGeneratedColumn, ManyToOne} from 'typeorm'
import { Role } from './roles.entity'
import { Permission } from './permissions.entity'

@Entity("role_permissions")
export class RolePermission {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Role, { eager: true, onDelete: "CASCADE" })
  role: Role;

  @ManyToOne(() => Permission, { eager: true, onDelete: "CASCADE" })
  permission: Permission;
}