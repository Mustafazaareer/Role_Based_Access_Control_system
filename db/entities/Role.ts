import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  CreateDateColumn,
  JoinTable
}
  from "typeorm";

import { Permission } from "./Permission.js";
import { User } from "./User.js";

@Entity('roles')
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => Permission, { cascade: true, eager: true })
  @JoinTable()
  permissions: Permission[];
  
  @ManyToMany(() => User)
  users: User[];

  @CreateDateColumn({
    type: 'timestamp',
    default: () => "CURRENT_TIMESTAMP(6)"
  })
  createdAt: Date;
}

// @ManyToMany(()=>Permission,permission=>permission.roles,{eager:true})
// @JoinTable()
// permissions:Permission[] | number[]

