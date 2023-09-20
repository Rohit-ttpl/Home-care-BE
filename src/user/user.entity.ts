// src/entities/user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum UserRole {
  Admin = 'admin',
  Nurse = 'nurse',
  Candidate = 'candidate',
}
@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.Candidate })
  role: UserRole;
  // Other user-related fields
}
