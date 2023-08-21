import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login: string;

  @Column()
  @Exclude()
  password: string;

  @VersionColumn()
  version: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date | number;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date | number;

  toResponse() {
    const { id, login, version, createdAt, updatedAt } = this;

    return {
      id,
      login,
      version,
      createdAt: +new Date(createdAt),
      updatedAt: +new Date(updatedAt),
    };
  }
}
